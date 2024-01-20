import React, { useContext } from 'react'
import { gameContext } from '../GameProvider'


export const useGame = () => {
  const gameQuery = useContext(gameContext)
  return gameQuery
}

