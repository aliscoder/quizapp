import { Avatar, Card, Column, ColumnBetween, List, Row, RowBetween, TextNormal, TextTiny, TextTitle } from "@components";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { GameInterface, PlayerInterface } from "@types";
import { Center, FlatList, Icon, Text, View } from "native-base";
import React from "react";
import { useGame } from "../hooks";
import Timer from "./Timer";






const GameFinished = ({ game }: { game: GameInterface }) => {

  const USER_FINISH = game.status !== 'after' && game.isPlayerDone
  const TITLE = USER_FINISH ? 'جایگاه فعلی بازیکنان' : 'رنکینگ نهایی مسابقه'
  const HAS_CUP = USER_FINISH ? false : true



  const { user } = useAuth()

  const ranking = game?.players?.slice(0).sort((a, b) => b.point - a.point)

  return (
    <ColumnBetween w='full' h="full" py={5}>

      <View h='8'>
        <Text textAlign='center' fontSize='2xl' fontWeight='bold' color='text.light'>{TITLE}</Text>
      </View>
     

      {game.status !== 'after' && <Center h='1/5'><Timer start={game.nowTime} end={game.endTime} size={35} /></Center>}
      <Card h='3/5' w='full'>

        <FlatList
        data={ranking as PlayerInterface[]}
        renderItem={({ item, index }) => (
          <RowBetween
            p={4}
            mt={index !== 0 ? 2 : 0}
            borderBottomWidth={0.4}
            borderColor='gray.700'
            background={item.user._id === user._id ? 'orange.400' : 'transparent'}
            borderRadius={5}
          >
            <Row space={2}>
              <TextNormal>{item.point}</TextNormal>

              {index < 3 && HAS_CUP && item.prize  && <Icon
                size='lg'
                as={Ionicons}
                name='trophy'
                color={index === 0 ? 'trophy.gold' : index === 1 ? 'trophy.silver' : index === 2 ? 'trophy.boronze' : 'red.200'}
              />}

            </Row>
            {index < 3 && HAS_CUP && item.prize  && <TextTitle>{item.prize} تومان</TextTitle>}
            <Row space={2}>
              <TextNormal>{item.user.username}</TextNormal>
              <Avatar uri={item.user.avatar?.url} size="md" />
            </Row>
          </RowBetween>
        )}
      />
      </Card>
      
    </ColumnBetween>

  );
};

export default GameFinished;
