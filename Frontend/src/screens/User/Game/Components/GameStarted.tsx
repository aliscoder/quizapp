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
import { useAppDispatch, useAuth } from "@hooks";
import { useAnswerQuestionMutation } from "@state/api/game";
import { GameInterface, PlayerInterface, QuestionInterface } from "@types";
import { Avatar, Center, FlatList, Icon, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import isCorrect from "../../../../utils/checkCorrectAnswer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { useGame } from "../hooks";
import Timer from "./Timer";
import moment from "jalali-moment";
import Api from "@state/api";

const GameStarted = ({ game, onFinish }: { game: GameInterface; onFinish?: any }) => {
  const { user } = useAuth();
  const userPlayer = game.players.find((player) => player.user._id == user._id)!;

  const [answerQuestion, { data: question, isSuccess, isLoading }] = useAnswerQuestionMutation();

  const [currQuestion, setCurrQuestion] = useState<QuestionInterface>(userPlayer.latestQuestion as QuestionInterface);

  useEffect(() => {
    if (isSuccess && question) {
      setCurrQuestion(question);
    }
  }, [isSuccess]);

  const answerQuestionByButton = (option: number) => {
    answerQuestion({
      gameId: game._id,
      playerId: user._id,
      answer: option,
      qId: currQuestion._id,
    });
  };

  return (
    <RowBetween h="full">
      <ColumnBetween space={5} h="full" w="85%" px={3} py={8} bg="header" borderRadius={10}>
        <RowBetween w="full">
          <Column alignItems="center" space={2}>
            <Center borderRadius="full" borderWidth={3} borderColor="border.sharp" w={50} h={50}>
              <TextNormal>{game.players.find((item) => item.user._id == userPlayer?.user._id)?.point}</TextNormal>
            </Center>
            <TextNormal>امتیاز</TextNormal>
          </Column>

          <Timer gameId={game._id} start={moment().unix()} end={game.endTime} size={80} />

          <Column alignItems="center" space={2}>
            <Center borderRadius="full" borderWidth={3} borderColor="border.sharp" w={50} h={50}>
              {currQuestion && <TextNormal>{game.questions.findIndex((q) => q === currQuestion._id) + 1}</TextNormal>}
            </Center>
            <TextNormal>شماره سوال</TextNormal>
          </Column>
        </RowBetween>

        <Image radius={200} uri={game.image} size={120} />
        <Text px={4} fontSize={20} textAlign="center" color="text.light">
          {currQuestion.body}
        </Text>
        <Column space={8} justifyContent="center" w="full" alignItems="center">
          <Column w="5/6">
            {currQuestion.options.map((option, index) => (
              <Button
                key={option}
                borderRadius={8}
                title={option}
                disabled={isLoading}
                scheme="secondary"
                my={2}
                h="12"
                w="full"
                onPress={() => answerQuestionByButton(index)}
              />
            ))}
          </Column>
        </Column>
      </ColumnBetween>

      <View w="10%" h="full" mt={5}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={game.players.slice(0).sort((a, b) => b.point - a.point)}
          renderItem={({ item, index }) => (
            <Column space={1} alignItems="center" w="full">
              <Avatar
                size="sm"
                bg="green.505"
                source={{
                  uri: item.user.avatar,
                }}
              />
              <TextTiny fontSize="xs">{item.user.username}</TextTiny>
              <RowBetween w="full">
                <TextTiny>{item.point}</TextTiny>
                <Icon
                  as={FontAwesome}
                  color={item.change === "up" ? "success" : "danger"}
                  name={item.change === "up" ? "caret-up" : "caret-down"}
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
