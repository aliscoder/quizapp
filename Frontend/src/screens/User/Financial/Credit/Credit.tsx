import React, { useCallback } from 'react'
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Dimensions } from 'react-native';
import { Column, Container, Input, List, RowBetween, Select, TextTitle } from '@components';
import DepositCard from '@screens/User/Components/DepositCard';
import { DepositInterface } from '@types';
const HomeTopTab = createMaterialTopTabNavigator();
type Props = {}




const Credit = (props: Props) => {



  return (
    <Container hasBack>
      <Column space={2}>
        <Input label='شماره کارت'/>
        <Input label='شماره شبا'/>
        <Input label='نام صاحب حساب'/>
      </Column>
    </Container>
  )
}

export default Credit