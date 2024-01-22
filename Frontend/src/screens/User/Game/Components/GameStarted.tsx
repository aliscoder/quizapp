import {
  Button,
  Column,
  ColumnBetween,
  Image,
  List,
  Row,
  RowBetween,
  TextNormal,
  TextTiny,
  TextTitle,
} from "@components";
import { useAuth } from "@hooks";
import { useAnswerQuestionMutation } from "@state/api/game";
import { GameInterface, PlayerInterface } from "@types";
import { Avatar, Center, FlatList, Icon, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import isCorrect from "../../../../utils/checkCorrectAnswer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { useGame } from "../hooks";
import Timer from "./Timer";


const GameStarted = ({game ,onFinish} : {game:GameInterface ,onFinish: any}) => {
 
  const [
    answerQuestion,
    {
      data: question,
      isSuccess: firstAnswerSuccess,
      isLoading: firstAnswerLoading,
    },
  ] = useAnswerQuestionMutation();

  const [currQuestion, setCurrQuestion] = useState<any>(game?.latestQuestion);

  const { user } = useAuth();
  const userPlayer = game.players.find((player) => player.user._id == user._id);





  useEffect(() => {
    if(firstAnswerSuccess) {
      if(question === 'Done') {
        onFinish()
      }else {


        setCurrQuestion(question)
      }
    }
  }, [firstAnswerSuccess])


  const answerQuestionByButton = (option : number) => {
      answerQuestion({
        gameId: game._id,
        playerId: user._id,
        answer: option,
        qId: currQuestion._id,
      });
  } 

  return (
    <RowBetween h="full" pb={3}>
      <ColumnBetween h="full" w="85%" p={3} bg="info" borderRadius={10}>

        <RowBetween w='full'>
          <Column alignItems='center' space={2}>
            <Center
              borderRadius="full"
              borderWidth={3}
              borderColor="border.sharp"
              w={50}
              h={50}
            >
              <TextNormal>{game.players.find(item => item.user._id == userPlayer?.user._id)?.point}</TextNormal>
            </Center>
            <TextNormal>امتیاز</TextNormal>
          </Column>
       
          <Timer start={game.nowTime} end={game.endTime} size={30} />

    
          <Column alignItems='center' space={2}>
            <Center
              borderRadius="full"
              borderWidth={3}
              borderColor="border.sharp"
              w={50}
              h={50}
            >
              {currQuestion && (
                <TextNormal>
                  {game.questions.findIndex((q) => q === currQuestion._id) + 1}
                </TextNormal>
              )}
            </Center>
            <TextNormal>شماره سوال</TextNormal>
          </Column>

        </RowBetween>

        <Image radius={20} uri={game.image} size={200} />

        
        <Column space={6} justifyContent="center" w='full' alignItems="center">
          
            <Text fontSize={20} textAlign='center' color="text.light">{currQuestion.body} </Text>
            <Column w='full'>
              {[1, 2, 3, 4].map((option) => (
                <Button
                  key={option}
                  borderRadius={15}
                  title={currQuestion[`option${option}`]}
                  disabled={firstAnswerLoading}
                  scheme="secondary"
                  my={2}
                  h='12'
                  w='full'
                  onPress={() => answerQuestionByButton(option)}
                />
              ))}
            </Column>

          </Column>
        

      </ColumnBetween>

      <View w="10%" h="full" mt={5}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={game.players.slice(0).sort((a,b) => b.point - a.point)}
          renderItem={({ item, index }) => (
            <Column space={1}  alignItems="center" w='full'>
              <Avatar
                size="sm"
                bg="green.505"
                source={{
                  uri: item.user.avatar?.url,
                }}
              />
              <TextTiny fontSize="xs">{item.user.username}</TextTiny>
              <RowBetween w='full'>
                <TextTiny>{item.point}</TextTiny>
                <Icon
                  as={FontAwesome}
                  color={item.isUp ? "success" : "danger"}
                  name={item.isUp ? "caret-up" : "caret-down"}
                />
              </RowBetween>
            </Column>
          )}
        />
      </View>
    </RowBetween>
  );
};

export default GameStarted;
