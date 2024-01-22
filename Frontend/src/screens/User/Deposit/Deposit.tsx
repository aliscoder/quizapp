import { Button, Card, Column, Container, Image, Input, List, RowBetween, TextTitle, Touch } from "@components"
import { useAuth } from "@hooks"
import { HomeGameTopTabOptions } from "@navigation/utils/options"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useDepositMutation } from "@state/api/deposit"
import { DepositInterface } from "@types"
import { theme } from "@utils"
import { useCallback, useEffect } from "react"
import { Dimensions, Linking } from "react-native"
import DepositCard from "../Components/DepositCard"
const HomeTopTab = createMaterialTopTabNavigator();


const DATA = [
  { title: '10 هزار سکه', value: 1000 },
  { title: '20 هزار سکه', value: 20000 },
  { title: '50 هزار سکه', value: 50000 },
  { title: '100 هزار سکه', value: 100000 },
]
const Deposit = () => {

  const [getbankURL, { isLoading, isError, isSuccess, data }] = useDepositMutation()
  const { user } = useAuth()


  function goToBank(amount: number) {

    getbankURL({ amount, userId: user._id })

  }

  useEffect(() => {
    if (isSuccess && data) {
      Linking.openURL(data.url)
    }
  }, [isSuccess])

  const renderGame = useCallback(({ item }: { item: DepositInterface }) => {
    return <DepositCard item={item}   />;
  },[]);


  const Buy = () => {
    return (
<List
        isPerformant
        estimatedItemSize={20}
        //@ts-ignore
        renderItem={renderGame}
        data={[{date:"1402/12/05" , emount:20000, status :"sucsses"},{date:"1402/12/06" , emount:40000, status :"cancel"}]}
        // isLoading={isLoading}
        // isError={isError}
        // refreshControl={Refresher}
      /> )



      // DATA.map(item => (
      //   <Touch key={item.value}>
      //     <Card bgColor={theme.colors.success} py={25}>
      //       <RowBetween>
      //         <Button isLoading={isLoading} onPress={() => goToBank(item.value)} size="1/2" title={`${item.value} تومان`} />

      //         <TextTitle>{item.title}</TextTitle>

      //       </RowBetween>
      //     </Card>
      //   </Touch>
      // ))
      //     )
  }

  const Sell = () => {
    return (
      <RowBetween>
        <Input />
        <TextTitle>تعداد سکه : </TextTitle>
      </RowBetween>

    )
  }

  return (
    <Container hasBack>
      <HomeTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="All"
        screenOptions={HomeGameTopTabOptions}
      >
        <HomeTopTab.Screen
          name="All"
          options={{ title: "خرید سکه" }}
          component={Buy}
        />
        <HomeTopTab.Screen
          options={{ title: "فروش سکه" }}
          name="Mine"
          component={Sell}
        />
      </HomeTopTab.Navigator>



    </Container>
  )
}

export default Deposit