import {
  Card,
  Column,
  Image,
  Row,
  RowBetween,
  TextNormal,
  TextTitle,
  Touch,
} from "@components";

import { DepositInterface } from "@types";
import moment from "jalali-moment";
import { View } from "native-base";
import React from "react";

import PlayersAvatarGroup from "./PlayersAvatarGroup";
import { theme } from "@utils";

type Props = {
  item:DepositInterface ;
};

const DepositCard = ({ item }: Props) => {
  return (
    
      <Card bgColor={item.status == "sucsses" ? theme.colors.success : theme.colors.danger }>
        <RowBetween>
          <Column alignItems="center">
            <TextTitle>{item.status}</TextTitle>
        
          </Column>
          <Column>
           
            <TextNormal>
              تاریخ تراکنش:
              {item?.date}
            </TextNormal>
          </Column>
        </RowBetween>
      </Card>
   
  );
};

export default DepositCard;
