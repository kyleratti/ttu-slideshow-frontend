import { ConditionalRender } from "@/components/ConditionalRender";
import PageContainer from "@/components/PageContainer";
import Settings from "@/components/Settings";
import Slideshow from "@/components/Slideshow";
import { createSettings } from "@/types";
import React, { useState } from "react";
import { ImageOrientationWarning } from "./components/ImageOrientationWarning";

const SlideshowPage: React.FC = () => {
  const [settings, setSettings] = useState(createSettings());

  return (
    <PageContainer>
      <Settings settings={settings} setSettings={setSettings} />

      <ConditionalRender
        shouldRender={!CSS.supports("image-orientation", "from-image")}
      >
        <ImageOrientationWarning />
      </ConditionalRender>

      <Slideshow settings={settings} />
    </PageContainer>
  );
};

export default SlideshowPage;
