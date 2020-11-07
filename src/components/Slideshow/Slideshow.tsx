import { BackendConnectionContext } from "@/context/BackendConnectionContext";
import { ISettings } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import Slide from "./components/Slide";

type SlideshowProps = {
  settings: ISettings;
};

const Slideshow: React.FC<SlideshowProps> = ({ settings }) => {
  // const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [nextRotate, setNextRotate] = useState(Date.now());

  const [imageInterval, setImageInterval] = useState(settings.interval);
  const [apiUrl, setApiUrl] = useState(settings.apiUrl);
  // const [client, setClient] = useState<w3cwebsocket | null>();
  const backendContext = useContext(BackendConnectionContext);

  // Tick
  useEffect(() => {
    const getTimestamp = () => Date.now();
    const getNextTimestamp = () => Date.now() + imageInterval;

    const tick = () => {
      if (getTimestamp() <= nextRotate) return;

      console.log(getTimestamp(), nextRotate, "tick");

      if (!backendContext.images) return;

      setImageIndex(
        imageIndex >= backendContext.images.length - 1 ? 0 : imageIndex + 1
      );
      setNextRotate(getNextTimestamp());
    };

    const imageTimer = setInterval(tick, 100);

    return () => clearInterval(imageTimer);
  }, [nextRotate, imageInterval]);

  useEffect(() => {
    setImageInterval(settings.interval);
    setApiUrl(settings.apiUrl);
  }, [settings]);

  // useEffect(() => {
  //   if (backendContext.setClient)
  //     backendContext.setClient(new w3cwebsocket(`ws://${apiUrl}`));
  // }, [apiUrl]);

  useEffect(() => {
    if (!backendContext.images)
      throw "Attempted to set image index without images array";

    if (imageIndex > backendContext.images.length - 1) setImageIndex(0);
  }, [backendContext.images]);

  let slides = [];

  for (let i = 0; i < backendContext.images.length; i++) {
    slides.push(
      <Slide
        key={i}
        index={i}
        apiUrl={apiUrl}
        imageName={backendContext.images[i]}
        active={i === imageIndex}
      />
    );
  }

  return (
    <div id="slideshow">
      <div id="stats" className="no-fullscreen">
        Currently rotating{" "}
        <span className="highlight">{backendContext.images.length}</span> image
        {backendContext.images.length !== 1 ? "s" : ""}
      </div>

      <div>{slides}</div>
    </div>
  );
};

export default Slideshow;
