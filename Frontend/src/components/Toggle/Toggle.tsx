import { ISwitchProps, Switch } from "native-base";
import React from "react";

interface Props extends ISwitchProps {}

const Toggle = ({ ...rest }: Props) => {
  return (
    <Switch
      onTrackColor="success"
      offTrackColor="text.muted"
      onThumbColor="enabled"
      offThumbColor="text.muted"
      {...rest}
    />
  );
};

export default Toggle;
