import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

type Props = {
    start:number;
    end:number;
    size?: number
}

const Timer = ({start ,end, size}: Props) => {
  return (
    <CircularProgress
          value={0}
          
          radius={(size || 40) * 3.2}
          maxValue={500}
          initialValue={end - start}
          progressValueColor={'#fff'}
          progressValueStyle={{fontSize: size || 40, fontFamily: 'Yekan'}}
          activeStrokeWidth={5}
          inActiveStrokeWidth={15}
          duration={(end - start) * 1000}
          // onAnimationComplete={changeGameStatus}
          progressFormatter={(value: number) => {
            'worklet';
      
            const seconds = Math.floor(value % 60);
            const minutes = Math.floor((value / 60) % 60);
            const hours = Math.floor(value / 3600)

            return `${hours < 10 ? '0'+hours : hours} : ${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`; // 2 decimal places
          }}
        />
  )
}

export default Timer