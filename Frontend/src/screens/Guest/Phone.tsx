import { Button, Column, Container, Input } from "@components";
import useSendCode from "./hooks/useSendCode";
import { Image } from "native-base";
import { Base } from "@utils";

const Phone = () => {
  const { handlePhoneChange, handleSendCode, isLoading } = useSendCode();
  return (
    <Container bodyPadded={false}>
      <Column
        h="full"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        px={5}
        pb={5}
        space={2}
      >
        <Image alt="" source={Base} width={400} height={400} />
        <Column w="full" space={2}>
          <Input
            autoFocus
            isFocused
            label="شماره موبایل خود را وارد نمایید"
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
            maxLength={11}
            placeholder="09131234567"
            icon="call-outline"
          />
          <Button
            scheme="success"
            onPress={handleSendCode}
            title="مرحله بعد"
            isLoading={isLoading}
          />
        </Column>
      </Column>
    </Container>
  );
};

export default Phone;
