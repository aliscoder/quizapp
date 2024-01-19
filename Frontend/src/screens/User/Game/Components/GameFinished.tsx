import { Avatar, Card, Column, List, Row, RowBetween, TextNormal, TextTiny, TextTitle } from "@components";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { GameInterface, PlayerInterface } from "@types";
import { Center, Icon, View } from "native-base";
import React from "react";


type Props = {
  game: GameInterface;
  players: PlayerInterface[]
};



const GameFinished = ({ game, players }: Props) => {

  const {user} = useAuth()

  const ranking  = game.players.slice(0).sort((a,b)=> b.point - a.point)
  
  return (
    <>
    
    <RowBetween p={2} justifyContent='center' py = {5}>
        
          <TextTitle color='warning'>رنکینگ مسابقه</TextTitle>
        </RowBetween>
        <List

          data={ranking}
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

                {index < 3 && <Icon
                size='lg'
                  as={Ionicons}
                  name='trophy'
                  color={index === 0 ? 'trophy.gold' : index === 1 ? 'trophy.silver' : index===2 ? 'trophy.boronze' :'red.200'}
                />}
                
              </Row>
              <Row space={2}>
                <TextNormal>{item.user.username}</TextNormal>
                <Avatar uri={item.user.avatar?.url} size="md" />
              </Row>
            </RowBetween>
          )}
        />
    </>

  );
};

export default GameFinished;
