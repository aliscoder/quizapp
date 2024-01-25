import React, { useCallback } from 'react'
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Dimensions } from 'react-native';
import { Container, List } from '@components';
import DepositCard from '@screens/User/Components/DepositCard';
import { DepositInterface } from '@types';
const HomeTopTab = createMaterialTopTabNavigator();
type Props = {}

const Transaction = (props: Props) => {


  const renderGame = useCallback(({ item }: { item: DepositInterface }) => {
    return <DepositCard item={item} />;
  }, []);



  return (
    <Container hasBack>

      <List
        isPerformant
        estimatedItemSize={20}
        //@ts-ignore
        renderItem={renderGame}
        data={[{ date: "1402/12/05", emount: 20000, status: "sucsses" },
        { date: "1402/12/06", emount: 40000, status: "cancel" }]}

      />
    </Container>
  )

}

export default Transaction