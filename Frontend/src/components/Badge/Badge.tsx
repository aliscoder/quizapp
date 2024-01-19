import { Badge as IBadge, Text } from "native-base";
import React from "react";
type Props = {
  sum: number;
};

const Badge = ({ sum }: Props) => {
  return (
    <IBadge
      backgroundColor="red.500"
      borderRadius="full"
      position="absolute"
      left={2}
      top={2}
      w={5}
      h={5}
      p={0}
      zIndex={100}
    >
      <Text fontSize={14} color="white">
        {sum}
      </Text>
    </IBadge>
  );
};

export default Badge;
