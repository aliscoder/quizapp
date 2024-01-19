import { Button, Column, Container, Input } from "@components";
import { useRoute } from "@react-navigation/native";
import React from "react";
import BaseImage from "./components/GuestBackgroundImage";
import useLogin from "./hooks/useLogin";
import useSendCodeAgain from "./hooks/useSendCodeAgain";
import { LoginScreenRouteProp } from "@navigation/utils/types";

const Login = () => {
  const { params } = useRoute<LoginScreenRouteProp>();
  const { handleInputChange, handleLogin, isLoading } = useLogin();
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();

  return (
    <Container bodyPadded={false} pt={4}>
      <Column space={3} p={3}>
        <Input
          onChangeText={(text) => handleInputChange("enteredCode", text)}
          keyboardType="numeric"
          maxLength={8}
          label="کد پیامک شده را وارد کنید"
          placeholder="13456"
        />
        <Input
          onChangeText={(text) => handleInputChange("password", text)}
          placeholder="*******"
          label="کلمه عبور را وارد کنید"
          secureTextEntry
        />

        <Button isLoading={isLoading} onPress={handleLogin} scheme="success" title="ورود" />
        <Button
          isLoading={againLoading}
          onPress={() => sendCodeAgain(params.phone)}
          scheme="warning"
          isDisabled={timer > 0}
          title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
        />
      </Column>
      <BaseImage />
    </Container>
  );
};

export default Login;
