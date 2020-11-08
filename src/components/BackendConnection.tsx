import { BackendConnectionContext } from "@/context/BackendConnectionContext";
import { ClientStatus, Image } from "@/types";
import React, { useState } from "react";
import { w3cwebsocket } from "websocket";

export const BackendConnection: React.FC = ({ children }) => {
  const [client, setClient] = useState<w3cwebsocket | undefined>(undefined);
  const [clientStatus, setClientStatus] = useState<ClientStatus>(
    ClientStatus.INITAL
  );
  const [images, setImages] = useState<Image[]>([]);

  return (
    <BackendConnectionContext.Provider
      value={{
        client,
        setClient,

        clientStatus,
        setClientStatus,

        images,
        setImages,
      }}
    >
      {children}
    </BackendConnectionContext.Provider>
  );
};
