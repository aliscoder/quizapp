import { Button, Card, Container, RowBetween, TextTitle, Touch } from '@components';
import { FinancialScreenNavigationProp } from '@navigation/utils/types';
import { useNavigation } from '@react-navigation/core';
import DepositCard from '@screens/User/Components/DepositCard';
import { DepositInterface } from '@types';
import { theme } from '@utils';
import { FlatList, Icon } from 'native-base'
import React from 'react'
import { useCallback, useEffect } from "react"
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
const HomeTopTab = createMaterialTopTabNavigator();
type Props = {}

const List = [
  { title: 'خرید سکه', link: 'Deposit' },
  { title: 'فروش سکه', link: 'Cashout' },
  { title: 'لیست تراکنش ها', link: 'Transaction' },
  { title: 'اطلاعات مالی', link: 'Credit' },
] as const

const Entry = () => {
  const { navigate } = useNavigation<FinancialScreenNavigationProp>()

  return (
    <Container hasBack>

      {List.map(item => (
        <Touch onPress={() => navigate(item.link)} key={item.link}  >
          <Card bgColor={theme.colors.info} py={25}>
            <RowBetween>
              <Icon color='text.light' as={SimpleLineIcons} name='arrow-left' />
              <TextTitle color='text.light'  >
                {item.title}
              </TextTitle>
            </RowBetween>
          </Card>
        </Touch>
      ))}
    </Container>
  )

}

export default Entry