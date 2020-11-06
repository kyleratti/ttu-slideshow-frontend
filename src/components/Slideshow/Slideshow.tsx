import { ISettings, MessageType, SocketMessage } from "@/types";
import React, { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";
import Slide from "./components/Slide";

type SlideshowProps = {
  settings: ISettings;
};

const Slideshow: React.FC<SlideshowProps> = ({ settings }) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  const [imageInterval, setImageInterval] = useState(settings.interval);
  const [apiUrl, setApiUrl] = useState(settings.apiUrl);
  const [client, setClient] = useState<w3cwebsocket>(
    new w3cwebsocket(`ws://${apiUrl}`)
  );

  useEffect(() => {
    setImageInterval(settings.interval);
    setApiUrl(settings.apiUrl);
  }, [settings]);

  useEffect(() => {
    setClient(new w3cwebsocket(`ws://${apiUrl}`));
  }, [apiUrl]);

  useEffect(() => {
    let innerImages: string[] = [];
    let innerIndex = 0;

    const receiveImages = (images: string[]) => {
      innerImages = images;
      setImages(images);
    };
    const addImage = (image: string) => {
      console.log("adding", image);
      innerImages.push(image);
      setImages([...innerImages]);
    };

    const removeImage = (image: string) => {
      console.log("removing", image);
      innerImages.splice(innerImages.indexOf(image), 1);
      setImages([...innerImages]);

      if (innerIndex > innerImages.length - 1) {
        setIndex(0);
      }
    };

    const setIndex = (index: number) => {
      innerIndex = index;
      setImageIndex(index);
    };

    const onTick = () => {
      if (innerImages.length > 1)
        setIndex(innerIndex >= innerImages.length - 1 ? 0 : innerIndex + 1);
    };

    setInterval(onTick, imageInterval);

    client.onopen = () => {
      console.log(`Web socket opened`);
    };

    client.onerror = (err) => {
      console.error(`Error with web socket:`, err);
    };

    client.onmessage = (message) => {
      try {
        const payload = JSON.parse(String(message.data)) as SocketMessage;

        switch (payload.type) {
          case MessageType.Full:
            receiveImages(payload.data);
            break;
          case MessageType.NewImage:
            addImage(payload.data);
            break;
          case MessageType.DeleteImage:
            removeImage(payload.data);
            break;
          default:
            console.error(`Unsupported MessageType`, (payload as any).type);
        }
      } catch (e) {
        console.error(`Error parsing json:`, e);
      }
    };

    client.onclose = () => {
      console.log(`Web socket closed`);
    };
  }, [imageInterval, apiUrl, client]);

  let rows = [];

  for (let i = 0; i < images.length; i++) {
    rows.push(
      <Slide
        key={i}
        index={i}
        apiUrl={apiUrl}
        imageName={images[i]}
        active={i === imageIndex}
      />
    );
  }

  return (
    <div id="slideshow">
      <div id="stats" className="no-fullscreen">
        Currently rotating <span className="highlight">{images.length}</span>{" "}
        image{images.length !== 1 ? "s" : ""}
      </div>
      <div>{rows}</div>
    </div>
  );
};

export default Slideshow;
