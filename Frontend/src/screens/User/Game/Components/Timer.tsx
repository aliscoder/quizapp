import { TextTiny } from "@components";
import { useChangeGameStatusMutation } from "@state/api/game";
import { Text } from "native-base";
import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

type Props = {
  start: number;
  end: number;
  size?: 180 | 120 | 80;
  gameId: string;
};

const Timer = ({ start, end, size = 180, gameId }: Props) => {
  const [changeGameStatus] = useChangeGameStatusMutation();

  return (
    <CountdownCircleTimer
      isPlaying
      size={size}
      duration={end - start}
      colors={["#0D9276", "#FF7800", "#FFE300", "#FA1E0E"]}
      colorsTime={[200, 90, 30, 0]}
      strokeWidth={4}
      onComplete={() => {
        changeGameStatus({ gameId });
      }}
    >
      {({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        return (
          <Text fontSize={size / 5}>
            {hours > 0 && (hours >= 10 ? hours : `0${hours} : `)}
            {minutes >= 10 ? minutes : `0${minutes}`} : {seconds >= 10 ? seconds : `0${seconds}`}
          </Text>
        );
      }}
    </CountdownCircleTimer>
  );
};

export default Timer;
