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
  const [nextRotate, setNextRotate] = useState(Date.now());

  const [imageInterval, setImageInterval] = useState(settings.interval);
  const [apiUrl, setApiUrl] = useState(settings.apiUrl);
  const [client, setClient] = useState<w3cwebsocket | null>();

  // Tick
  useEffect(() => {
    const getTimestamp = () => Date.now();
    const getNextTimestamp = () => Date.now() + imageInterval;

    const tick = () => {
      if (getTimestamp() <= nextRotate) return;

      console.log(getTimestamp(), nextRotate, "tick");

      setImageIndex(imageIndex >= images.length - 1 ? 0 : imageIndex + 1);
      setNextRotate(getNextTimestamp());
    };

    const imageTimer = setInterval(tick, 100);

    return () => clearInterval(imageTimer);
  }, [nextRotate, imageInterval]);

  useEffect(() => {
    setImageInterval(settings.interval);
    setApiUrl(settings.apiUrl);
  }, [settings]);

  useEffect(() => {
    setClient(new w3cwebsocket(`ws://${apiUrl}`));
  }, [apiUrl]);

  useEffect(() => {
    if (imageIndex > images.length - 1) setImageIndex(0);
  }, [images]);

  const receiveImages = (images: string[]) => {
    setImages(images);
  };

  const addImage = (image: string) => {
    console.log(`[ADD] ${image}`);
    setImages([...images, image]);
  };

  const removeImage = (image: string) => {
    console.log(`[REMOVE] ${image}`);

    const cloned = [...images];
    cloned.splice(cloned.indexOf(image), 1);
    setImages(cloned);
  };

  useEffect(() => {
    if (!client) return;

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
  }, [imageInterval, apiUrl, client, images]);

  let slides = [];

  for (let i = 0; i < images.length; i++) {
    slides.push(
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
      <div>{slides}</div>
    </div>
  );
};

export default Slideshow;
