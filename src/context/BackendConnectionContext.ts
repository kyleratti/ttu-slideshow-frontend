import { ClientStatus, Image } from "@/types";
import { createContext } from "react";
import { w3cwebsocket } from "websocket";

type BackendConnectionProps = {
  client: w3cwebsocket | undefined;
  setClient:
    | React.Dispatch<React.SetStateAction<w3cwebsocket | undefined>>
    | undefined;

  clientStatus: ClientStatus;
  setClientStatus:
    | React.Dispatch<React.SetStateAction<ClientStatus>>
    | undefined;

  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>> | undefined;
};

export const BackendConnectionContext = createContext<BackendConnectionProps>({
  client: undefined,
  setClient: undefined,

  clientStatus: ClientStatus.UNKNOWN,
  setClientStatus: undefined,

  images: [],
  setImages: undefined,
});
