import { Button, Column, Container, Input } from "@components";
import { useAuth } from "@hooks";
import { useCompleteAccountMutation } from "@state/api/financial";
import React, { useState } from "react";

const Credit = () => {
  const { user } = useAuth()
  const [account, setAccount] = useState({
    card: "",
    sheba: "",
    owner: "",
  });

  const [completeAccount, { isLoading }] = useCompleteAccountMutation()

  return (
    <Container hasBack>
      <Column space={2}>
        <Input
          isDisabled={!!user.financial}
          placeholder="6037 ..."
          onChangeText={(t) => setAccount((prev) => ({ ...prev, card: t }))}
          label="شماره کارت"
        />
        <Input
          isDisabled={!!user.financial}
          placeholder="IR ..."
          onChangeText={(t) => setAccount((prev) => ({ ...prev, sheba: t }))}
          label="شماره شبا"
        />
        <Input
          isDisabled={!!user.financial}
          placeholder="علی معافی"
          onChangeText={(t) => setAccount((prev) => ({ ...prev, owner: t }))}
          label="نام صاحب حساب"
        />

        <Button title="ثبت اطلاعات" onPress={() => completeAccount(account)} disabled={isLoading} />
      </Column>
    </Container>
  );
};

export default Credit;
