import { Button, Column, Container, Input } from "@components";
import { useShop } from "@hooks";
import BaseImage from "./components/GuestBackgroundImage";
import useSendCode from "./hooks/useSendCode";

const Phone = () => {
  const { handlePhoneChange, handleSendCode, isLoading } = useSendCode();
  return (
    <Container bodyPadded={false} pt={4}>
      <Column space={2} p={3}>
        <Input
          label="شماره موبایل خود را وارد نمایید"
          onChangeText={handlePhoneChange}
          keyboardType="numeric"
          maxLength={11}
          placeholder="09131234567"
          icon="call-outline"
        />
        <Button scheme="success" onPress={handleSendCode} title="مرحله بعد" isLoading={isLoading} />
      </Column>
      <BaseImage />
    </Container>
  );
};

export default Phone;
