import {
  Card,
  Column,
  Image,
  Row,
  RowBetween,
  TextNormal,
  TextTitle,
  Touch,
} from "@components";

import { GameInterface } from "@types";
import moment from "jalali-moment";
import { View } from "native-base";
import React from "react";

import PlayersAvatarGroup from "./PlayersAvatarGroup";
import { theme } from "@utils";

type Props = {
  game: GameInterface;
  onCardAction: (game: GameInterface) => void;
  isMine: boolean;
};

const QuizEntranceCard = ({ game, onCardAction, isMine }: Props) => {
  return (
    <Touch onPress={() => onCardAction(game)}>
      <Card bgColor={isMine ? theme.colors.info : undefined}>
        <RowBetween>
          <Image uri={game.image} size={80} radius={50} />
          <Column alignItems="center">
            <TextTitle>{`مسابقه ${game.type} تومانی`}</TextTitle>
            <PlayersAvatarGroup players={game.players} />
          </Column>
          <RowBetween h="full" w="1/6">
            <View
              h="full"
              w={1}
              borderRadius={10}
              background={isMine ? "success" : "secondary"}
            />
            <TextNormal>
              {moment.unix(game.startTime).format("H : mm")}
            </TextNormal>
          </RowBetween>
        </RowBetween>
      </Card>
    </Touch>
  );
};

export default QuizEntranceCard;
