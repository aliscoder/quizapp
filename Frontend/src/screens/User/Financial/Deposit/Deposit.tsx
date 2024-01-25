import { Button, Card, Column, Container, Image, Input, List, RowBetween, TextTitle, Touch } from "@components"
import { useAuth } from "@hooks"
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { useDepositMutation } from "@state/api/deposit"
import { DepositInterface } from "@types"
import { theme } from "@utils"
import { useCallback, useEffect } from "react"
import { Dimensions, Linking } from "react-native"
import DepositCard from "../../Components/DepositCard"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
const HomeTopTab = createMaterialTopTabNavigator();


const DATA = [
  { title: '10 هزار سکه', value: 1000 },
  { title: '20 هزار سکه', value: 20000 },
  { title: '50 هزار سکه', value: 50000 },
  { title: '100 هزار سکه', value: 100000 },
]

const Deposit = () => {


  return (
    <Container hasBack>
      {
        DATA.map(item => (
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

export default Deposit