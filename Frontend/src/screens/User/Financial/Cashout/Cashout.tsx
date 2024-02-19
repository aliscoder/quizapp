import { Card, Container, List, RowBetween, TextTitle, Touch } from "@components";
import { useAuth, useToast } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TransactionCard from "@screens/User/Components/TransactionCard";
import { useCashoutMutation, useFinancialsQuery } from "@state/api/financial";
import { FinancialInterface } from "@types";
import { theme } from "@utils";
import { useCallback, useEffect } from "react";
import { Dimensions, Linking } from "react-native";

const CashoutTopTab = createMaterialTopTabNavigator();

const cashoutItems = [
  { title: "20000 هزار سکه", value: 20000 },
  { title: "50000 هزار سکه", value: 50000 },
  { title: "100000 هزار سکه", value: 100000 },
  { title: "500000 هزار سکه", value: 500000 },
];


const CashoutList = () => {

  const { user } = useAuth();
  const {data: financials, isLoading} = useFinancialsQuery(user._id)

  console.log(financials)

  const renderGame = useCallback(({ item }: { item: FinancialInterface }) => {
    return <TransactionCard item={item} />;
  }, []);

  return (
    <List
      isPerformant
      estimatedItemSize={20}
      isLoading={isLoading}
      //@ts-ignore
      renderItem={renderGame}
      data={financials?.filter(item => item.type == 'cashout')}

    />
  )
}

const CashoutSection = () => {

  const [cashout, {isLoading , isError , isSuccess, error}] = useCashoutMutation();
  const { user } = useAuth();
  const {showSuccess, showError} = useToast()

  useEffect(() => {
    if(isSuccess) {
      showSuccess('درخواست شما با موفقیت ثبت شد')
    }
    if(isError) {
      //@ts-ignore
      showError(error?.data?.error);
    }
  }, [isError , isSuccess])
  return cashoutItems.map((item) => (
    <Touch disabled={isLoading} key={item.value} onPress={() => cashout({ amount: item.value, userId: user._id })}>
      <Card bgColor={theme.colors.success}>
        <RowBetween>
          <TextTitle>{item.title}</TextTitle>
        </RowBetween>
      </Card>
    </Touch>
  ))
}

const Cashout = () => {

  return (
    <Container hasBack>

      <CashoutTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="All"
        screenOptions={HomeGameTopTabOptions}
      >
        <CashoutTopTab.Screen
          name="Cashout"
          options={{ title: 'فروش سکه' }}
          children={() => <CashoutSection />}

        />
        <CashoutTopTab.Screen
          options={{ title: 'تراکنش های من' }}
          name="CashoutList"
          children={() => <CashoutList />}
        />
      </CashoutTopTab.Navigator>
    </Container>
  );
};

export default Cashout;
