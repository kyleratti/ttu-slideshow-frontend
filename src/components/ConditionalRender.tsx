import React from "react";

type ConditionalRenderProps = {
  shouldRender: boolean;
};

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  shouldRender,
  children,
}) => (shouldRender ? <>{children}</> : null);
