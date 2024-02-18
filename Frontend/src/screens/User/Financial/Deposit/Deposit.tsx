import { Button, Card, Column, Container, Input, List, RowBetween, TextTitle, Touch } from "@components";
import { useAuth } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { useDepositMutation } from "@state/api/deposit";
import { DepositInterface } from "@types";
import { theme } from "@utils";
import { useCallback, useEffect } from "react";
import { Dimensions, Linking } from "react-native";
import DepositCard from "../../Components/DepositCard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "native-base";
const HomeTopTab = createMaterialTopTabNavigator();
// const img = require('./../../../../assets/photos/coin4.png')

const DATA = [
  { title: "100 هزار سکه", value: 1000 },
  { title: "20 هزار سکه", value: 20000 },
  { title: "50 هزار سکه", value: 50000 },
  { title: "100 هزار سکه", value: 100000 },
];

const Deposit = () => {
  const [getLink, { isSuccess, data }] = useDepositMutation();
  const { user } = useAuth();

  useEffect(() => {
    if (isSuccess && data) {
      Linking.openURL(data.url);
    }
  }, [isSuccess]);

  return (
    <Container hasBack>
      {DATA.map((item) => (
        <Touch key={item.value} onPress={() => getLink({ amount: item.value, userId: user._id })}>
          <Card bgColor={theme.colors.success} py={25}>
            <RowBetween>
              <Image size="m" source={{ uri: require("../../../../assets/photos/coin33.png") }} />
              <TextTitle>{item.title}</TextTitle>
            </RowBetween>
          </Card>
        </Touch>
      ))}
    </Container>
  );
};

export default Deposit;
