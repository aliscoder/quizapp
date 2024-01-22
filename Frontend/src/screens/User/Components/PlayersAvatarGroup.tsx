import { PlayerInterface } from "@types";
import { Avatar, Center } from "native-base";
import React from "react";

type Props = {
  players: PlayerInterface[];
};

const PlayersAvatarGroup = ({ players }: Props) => {
  return (
    <Avatar.Group
      _avatar={{
        size: "sm",
        mx: 1,
        borderWidth: 1,
        borderColor: "border.sharp",
      }}
      max={4}
    >
      {players
        .map((player) => player.user.avatar?.url)
        .map((item, index) => (
          <Avatar
            key={index}
            bg="green.500"
            source={{
              uri: item,
            }}
          >
            AJ
          </Avatar>
        ))}
    </Avatar.Group>
  );
};

export default PlayersAvatarGroup;
