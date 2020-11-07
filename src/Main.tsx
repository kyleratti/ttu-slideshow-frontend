import React from "react";
import { BackendConnection } from "./components/BackendConnection";
import SlideshowPage from "./pages/Slideshow";

const Main: React.FC = () => (
  <BackendConnection>
    <SlideshowPage />
  </BackendConnection>
);

export default Main;
