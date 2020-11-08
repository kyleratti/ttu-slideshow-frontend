import * as React from "react";
import { useEffect } from "react";

type Props = {
  imageName: string;
  index: number;
  apiUrl: string;
  active?: boolean;
};

const Slide: React.FC<Props> = ({
  imageName,
  index,
  apiUrl,
  active = false,
}) => {
  useEffect(() => {}, [active]);

  return (
    <div className={"slide " + (active ? "active" : "inactive")}>
      <label>{index + 1}</label>
      <img
        src={`http://${apiUrl}/img/${imageName}`}
        alt="Automatically loaded image"
        decoding="async"
      />
    </div>
  );
};

export default Slide;
