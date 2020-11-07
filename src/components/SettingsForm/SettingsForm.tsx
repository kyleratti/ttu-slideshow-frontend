import { BackendConnectionContext } from "@/context/BackendConnectionContext";
import { ClientStatus, MessageType, SocketMessage } from "@/types";
import React, { useContext, useEffect } from "react";
import { w3cwebsocket } from "websocket";
import { SettingsProps } from "../Settings";
import { ConnectionStatus } from "./components/ConnectionStatus";

const clamp = (num: number, min: number, max: number) =>
  Math.max(min, Math.min(num, max));

const [minInterval, maxInterval] = [500, 1000 * 20];

export const SettingsForm: React.FC<SettingsProps> = ({
  settings,
  setSettings,
}) => {
  const backendContext = useContext(BackendConnectionContext);

  useEffect(() => {
    if (!backendContext.setClient) throw "backendContext setClient not ready";

    const receiveImages = (images: string[]) => {
      backendContext.setImages!(images);
    };

    const client = new w3cwebsocket(`ws://${settings.apiUrl}`);

    client.onopen = () => {
      console.log(`Web socket opened`);

      backendContext.setClientStatus!(ClientStatus.OK);
    };

    client.onerror = (err) => {
      console.error(`Error with web socket:`, err);

      backendContext.setClientStatus!(ClientStatus.ERROR);
    };

    client.onmessage = (message) => {
      backendContext.setClientStatus!(ClientStatus.OK);

      try {
        const payload = JSON.parse(String(message.data)) as SocketMessage;

        switch (payload.type) {
          case MessageType.Full:
            receiveImages(payload.data);
            break;
          case MessageType.NewImage:
            throw "Received unsupported NewImage message";
          case MessageType.DeleteImage:
            throw "Received unsupported RemoveImage message";
          default:
            console.error(`Unsupported MessageType`, (payload as any).type);
        }
      } catch (e) {
        console.error(`Error parsing json:`, e);
      }
    };

    client.onclose = () => {
      console.log(`Web socket closed`);

      backendContext.setClientStatus!(ClientStatus.DISCONNECTED);
    };

    backendContext.setClient(client);
  }, [settings.apiUrl]);

  return (
    <form>
      <div className="input intervalInput">
        <label htmlFor="interval">
          Interval (
          <abbr title="milliseconds (NumberOfSeconds * 1000)">ms</abbr>
          ):
        </label>

        <input
          type="number"
          max={1000 * 20}
          min={500}
          defaultValue={settings.interval}
          step={100}
          onChange={(e) =>
            setSettings({
              ...settings,
              interval: clamp(e.target.valueAsNumber, minInterval, maxInterval),
            })
          }
        />
      </div>

      <div className="input apiUrlInput">
        <label htmlFor="apiUrl">API URL:</label>

        <input
          type="url"
          title="See me before touching this"
          defaultValue={settings.apiUrl}
          onChange={(e) =>
            setSettings({
              ...settings,
              apiUrl: e.target.value,
            })
          }
          readOnly
        />

        <ConnectionStatus />
      </div>
    </form>
  );
};
