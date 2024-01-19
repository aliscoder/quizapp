import { AvatarLogo } from "@utils";
import { Avatar as NAvatar } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

interface Props extends InterfaceAvatarProps {
  onPress?: () => void;
  uri: string | null | undefined;
  local?: string | null;
}
const Avatar: React.FC<Props> = ({ onPress, uri, local, ...rest }) => {
  const [image, setImage] = useState(uri);

  useEffect(() => {
    setImage(uri);
  }, [uri]);
  return (
    <Pressable onPress={onPress}>
      <NAvatar
        borderWidth={1}
        borderColor="border.muted"
        source={
          local
            ? { uri: `data:image/jpeg;base64,${local}` }
            : image && !local
            ? {
                uri: image,
              }
            : AvatarLogo
        }
        {...rest}
      />
    </Pressable>
  );
};

export default Avatar;
