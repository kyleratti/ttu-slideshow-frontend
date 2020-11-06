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

      <Slideshow settings={settings} />
    </PageContainer>
  );
};

export default SlideshowPage;
