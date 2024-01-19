import React, { ComponentType } from "react";

interface DynamicComponentProps {
  component: React.FC;
  props: any;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  component: Component,
  props,
}: DynamicComponentProps) => {
  return <Component {...props} />;
};

export default DynamicComponent;
