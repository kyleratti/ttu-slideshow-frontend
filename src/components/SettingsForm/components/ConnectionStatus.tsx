import { BackendConnectionContext } from "@/context/BackendConnectionContext";
import React, { useContext, useEffect } from "react";

export const ConnectionStatus: React.FC = () => {
  const backendContext = useContext(BackendConnectionContext);

  useEffect(() => {
    console.log("READY STATE CHANGED");
  }, [backendContext]);

  const { clientStatus } = backendContext;

  return (
    <span className="clientStatus">
      Status:{" "}
      <span className={"clientStatus-" + clientStatus.toLowerCase()}>
        {clientStatus}
      </span>
    </span>
  );
};
