import React from "react";

export const ImageOrientationWarning: React.FC = () => (
  <div className={"disclaimer no-fullscreen"}>
    <h2>Warning: Image Orientation Issues</h2>

    <p>
      For whatever reason, digital cameras and smartphones don't store pictures
      in the orientation in which they were taken; instead, they store it in the
      metadata.
    </p>

    <p>
      Your browser does not support the features necessary to display pictures
      in their proper orientation. As such, images may appear sideways.
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
);
