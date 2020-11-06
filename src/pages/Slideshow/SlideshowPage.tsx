import PageContainer from "@/components/PageContainer";
import Settings from "@/components/Settings";
import Slideshow from "@/components/Slideshow";
import { createSettings } from "@/types";
import React, { useState } from "react";

const SlideshowPage: React.FC = () => {
  const [settings, setSettings] = useState(createSettings());

  return (
    <PageContainer>
      <Settings settings={settings} setSettings={setSettings} />

      <div
        className={
          "disclaimer no-fullscreen " +
          (CSS.supports("image-orientation: from-image") ? "hide" : "")
        }
      >
        <h2>Warning: Image Orientation Issues</h2>

        <p>
          For whatever reason, digital cameras and smartphones don't store
          pictures in the orientation in which they were taken; instead, they
          store it in the metadata.
        </p>

        <p>
          Your browser does not support the features necessary to display
          pictures in their proper orientation. As such, images may appear
          sideways.
        </p>

        <p>
          You are free to continue, however I highly recommend you{" "}
          <a
            href="https://caniuse.com/?search=image-orientation"
            target="_blank"
            rel="nofollow"
          >
            use a remotely modern browser
          </a>
          .
        </p>
      </div>

      <Slideshow settings={settings} />
    </PageContainer>
  );
};

export default SlideshowPage;
