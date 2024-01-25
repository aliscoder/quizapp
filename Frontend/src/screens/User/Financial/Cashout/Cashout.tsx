import { Button, Card, Container, RowBetween, TextTitle, Touch } from '@components'
import { theme } from "@utils"
import React from 'react'
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Dimensions } from 'react-native';
const HomeTopTab = createMaterialTopTabNavigator();

type Props = {}
const DATASeel = [
  { title: '20 هزار سکه', value: 20000 },
  { title: '50 هزار سکه', value: 50000 },
  { title: '100 هزار سکه', value: 100000 },
]


const Cashout = (props: Props) => {
  return (
    <Container hasBack>

      {
        DATASeel.map(item => (
          <Touch key={item.value}>
            <Card bgColor={theme.colors.success} py={25}>
              <RowBetween>
                <TextTitle>{item.title}</TextTitle>
              </RowBetween>
            </Card>
          </Touch>
        ))
      }
    </Container>
  )



}

export default Cashout