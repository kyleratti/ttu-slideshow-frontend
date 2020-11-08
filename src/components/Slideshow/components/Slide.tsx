import * as React from "react";

type Props = {
  imageName: string;
  timestamp: Date;
  index: number;
  apiUrl: string;
  active?: boolean;
};

const Slide: React.FC<Props> = ({
  imageName,
  timestamp,
  index,
  apiUrl,
  active = false,
}) => (
  <div className={"slide " + (active ? "active" : "inactive")}>
    <label>{index + 1}</label>
    <img
      src={`http://${apiUrl}/img/${imageName}`}
      alt={imageName}
      decoding="async"
    />
    <div className="timestamp no-fullscreen">
      Added {timestamp.getHours().toString().padStart(2, "0")}:
      {timestamp.getMinutes().toString().padStart(2, "0")}:
      {timestamp.getSeconds().toString().padStart(2, "0")}
    </div>
  </div>
);

export default Slide;
