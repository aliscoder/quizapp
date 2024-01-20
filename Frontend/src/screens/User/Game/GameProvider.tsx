import { useAuth } from '@hooks';
import { GameRouteProp } from '@navigation/utils/types';
import { useRoute } from '@react-navigation/core';
import { useGetGameQuery } from '@state/api/game';
import { GameInterface } from '@types';
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';
import Game from './Game';

type ContextProps = {
    game: GameInterface | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any
}


export const gameContext = createContext<ContextProps>({} as ContextProps)

const GameProvider = () => {
    const { params } = useRoute<GameRouteProp>();
    const { user } = useAuth()
    const { gameId } = params;
    const { data: game, isLoading, isError, error } = useGetGameQuery({ userId: user._id, gameId }, { pollingInterval: 3000 });



    return (
        <gameContext.Provider value={{ game, isLoading, isError, error }}>
            <Game />
        </gameContext.Provider>
    )
}



export default GameProvider