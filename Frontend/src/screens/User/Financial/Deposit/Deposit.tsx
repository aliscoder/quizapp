import { Card, Container, List, RowBetween, TextTitle, Touch } from "@components";
import { useAuth } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TransactionCard from "@screens/User/Components/TransactionCard";
import { useDepositMutation, useFinancialsQuery } from "@state/api/financial";
import { FinancialInterface } from "@types";
import { theme } from "@utils";
import { useCallback, useEffect } from "react";
import { Dimensions, Linking } from "react-native";

const DepositTopTab = createMaterialTopTabNavigator();

const depositItems = [
  { title: "100 هزار سکه", value: 1000 },
  { title: "20 هزار سکه", value: 20000 },
  { title: "50 هزار سکه", value: 50000 },
  { title: "100 هزار سکه", value: 100000 },
];


const DepositList = () => {

  const { user } = useAuth();
  const {data: financials, isLoading} = useFinancialsQuery(user._id)

  const renderGame = useCallback(({ item }: { item: FinancialInterface }) => {
    return <TransactionCard item={item} />;
  }, []);

  return (
    <List
      isPerformant
      estimatedItemSize={20}
      //@ts-ignore
      renderItem={renderGame}
      isLoading={isLoading}
      data={financials?.filter(item => item.type == 'deposit')}

    />
  )
}

const DepositSection = () => {

  const [getLink, { isSuccess, data, isLoading }] = useDepositMutation();
  const { user } = useAuth();

  useEffect(() => {
    if (isSuccess && data) {
      Linking.openURL(data.url);
    }
  }, [isSuccess]);

  return depositItems.map((item) => (
    <Touch disabled={isLoading} key={item.value} onPress={() => getLink({ amount: item.value, userId: user._id })}>
      <Card bgColor={theme.colors.success}>
        <RowBetween>
          <TextTitle>{item.title}</TextTitle>
        </RowBetween>
      </Card>
    </Touch>
  ))
}

const Deposit = () => {

  return (
    <Container hasBack>

      <DepositTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="All"
        screenOptions={HomeGameTopTabOptions}
      >
        <DepositTopTab.Screen
          name="Deposit"
          options={{ title: 'خرید سکه' }}
          children={() => <DepositSection />}

        />
        <DepositTopTab.Screen
          options={{ title: 'تراکنش های من' }}
          name="DepositList"
          children={() => <DepositList />}
        />
      </DepositTopTab.Navigator>
    </Container>
  );
};

export default Deposit;
