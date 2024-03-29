import { Avatar, Card, Column, Row, RowBetween, TextNormal } from "@components";
import { useAuth } from "@hooks";
import { Center, FlatList } from "native-base";
import React from "react";
import Timer from "./Timer";
import { GameInterface } from "@types";
import moment from "jalali-moment";

const GamePended = ({ game }: { game: GameInterface }) => {
  const { user } = useAuth();

  return (
    <Column h="full" pb={5}>
      <Center h="1/3">
        <Timer start={moment().unix()} end={game.startTime} gameId={game._id} />
      </Center>
      <Card h="2/3" bgColor="transparent">
        <RowBetween p={2}>
          <TextNormal>{game.players.length} نفر</TextNormal>
          <TextNormal>لیست شرکت کنندگان</TextNormal>
        </RowBetween>
        <FlatList
          style={{ maxHeight: 400 }}
          data={game.players.slice(0).reverse()}
          renderItem={({ item, index }) => (
            <RowBetween
              p={2}
              mt={index !== 0 ? 2 : 0}
              background={item.user._id === user._id ? "success" : "transparent"}
              borderRadius={5}
            >
              <TextNormal>{item.point}</TextNormal>
              <Row space={2}>
                <TextNormal>{item.user.username}</TextNormal>
                <Avatar uri={item.user.avatar} size="sm" />
              </Row>
            </RowBetween>
          )}
        />
      </Card>
    </Column>
  );
};

export default GamePended;
