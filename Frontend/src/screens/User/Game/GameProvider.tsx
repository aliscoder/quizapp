import { useAuth } from '@hooks';
import { GameRouteProp } from '@navigation/utils/types';
import { useRoute } from '@react-navigation/core';
import { useGetGameQuery } from '@state/api/game';
import { GameInterface } from '@types';
import React, { ReactNode, createContext, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import Game from './Game';

type ContextProps = {
    game: GameInterface | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any
}


export const gameContext = createContext<ContextProps>({} as ContextProps)
export const socketContext = createContext<Socket>({} as Socket);

const GameProvider = () => {
    const { params } = useRoute<GameRouteProp>();
    const { user } = useAuth()
    const { gameId } = params;
    const { data: game, isLoading, isError, error } = useGetGameQuery({ userId: user._id, gameId });

    const socket = io(process.env.EXPO_PUBLIC_API_URL as string);

    useEffect(() => {
        socket.emit("join-game", { game: gameId });
        return () => {
            socket.emit("leave-game", { game: gameId });
            socket.disconnect();
        };
    }, [socket]);

    return (
        <gameContext.Provider value={{ game, isLoading, isError, error }}>
            <socketContext.Provider value={socket}>
              <Game />
            </socketContext.Provider>
        </gameContext.Provider>
    )
}



export default GameProvider