import { Card, Column, RowBetween, TextNormal, TextTitle } from "@components";
import { FinancialInterface } from "@types";
import moment from "jalali-moment";
import React from "react";
import { theme } from "@utils";

type Props = {
  item: FinancialInterface;
};

const TransactionCard = ({ item }: Props) => {
  return (
    <Card
      bgColor={
        item.status == "done"
          ? theme.colors.success
          : item.status == "pending"
            ? theme.colors.warning
            : theme.colors.danger
      }
    >
      <RowBetween>
        <Column alignItems="center">
          <TextTitle>
            {item.status === "done" ? "انجام شده" : item.status === "pending" ? "در انتظار تایید" : "رد شده"}
          </TextTitle>
        </Column>
        <Column>
          <TextNormal>{moment(item.createdAt).locale("fa").format("HH : mm - dddd d MMM")}</TextNormal>
        </Column>
      </RowBetween>
    </Card>
  );
};

export default TransactionCard;
