import {
  Avatar,
  Card,
  Column,
  List,
  Row,
  RowBetween,
  TextNormal,
} from "@components";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { GameInterface } from "@types";
import { Center, FlatList, Icon } from "native-base";
import React from "react";
import CircularProgress from 'react-native-circular-progress-indicator';

type Props = {
  game: GameInterface;

};

const GamePended = ({ game }: Props) => {
  const { user } = useAuth();

  
  return (
    <Column h="full" pb={5}>
      <Center h="1/2">
        <CircularProgress
          value={0}
          radius={120}
          maxValue={500}
          initialValue={game.startTime - game.nowTime}
          progressValueColor={'#fff'}
          progressValueStyle={{fontSize: 46, fontFamily: 'Yekan'}}
          activeStrokeWidth={5}
          inActiveStrokeWidth={15}
          duration={(game.startTime - game.nowTime) * 1000}
          // onAnimationComplete={changeGameStatus}
          progressFormatter={(value: number) => {
            'worklet';
      
            const seconds = Math.floor(value % 60);
            const minutes = Math.floor((value / 60) % 60);
            const hours = Math.floor(value / 3600)

            return `${hours < 10 ? '0'+hours : hours} : ${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`; // 2 decimal places
          }}
        />
      </Center>



      <Card h="1/2" bgColor="transparent">
        <RowBetween p={2}>
          <TextNormal>{game.players.length} نفر</TextNormal>
          <TextNormal>لیست شرکت کنندگان</TextNormal>
        </RowBetween>
        <FlatList
          style={{ maxHeight: 400 }}
          data={game.players}
          renderItem={({ item, index }) => (
            <RowBetween
              p={2}
              mt={index !== 0 ? 2 : 0}
              background={item.user._id === user._id ? "success" : "transparent"}
              borderRadius={5}
            >
              <Row space={2}>
                <TextNormal>{item.point}</TextNormal>
                <Icon
                  as={FontAwesome}
                  name={item.isUp ? "caret-up" : "caret-down"}
                  color={item.isUp ? "success" : "danger"}
                />
              </Row>
              <Row space={2}>
                <TextNormal>{item.user.username}</TextNormal>
                <Avatar uri={item.user.avatar?.url} size="sm" />
              </Row>
            </RowBetween>
          )}
        />
      </Card>
    </Column>
  );
};

export default GamePended;
