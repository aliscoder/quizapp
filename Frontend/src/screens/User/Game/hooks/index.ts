import React, { useContext } from 'react'
import { gameContext, socketContext } from '../GameProvider'


export const useGame = () => {
  const gameQuery = useContext(gameContext)
  return gameQuery
}

export const useGameSocket = () => {
  const socket = useContext(socketContext)
  return socket
}