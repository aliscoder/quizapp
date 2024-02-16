import { Button, Column, Container, Input } from "@components";
import { useRoute } from "@react-navigation/native";
import React from "react";
import useLogin from "./hooks/useLogin";
import useSendCodeAgain from "./hooks/useSendCodeAgain";
import { LoginScreenRouteProp } from "@navigation/utils/types";
import { Image } from "native-base";
import { Base } from "@utils";

const Login = () => {
  const { params } = useRoute<LoginScreenRouteProp>();
  const { handleInputChange, handleLogin, isLoading } = useLogin();
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();

  return (
    <Container bodyPadded={false} pt={4}>
      <Column
        h="full"
        w="full"
        justifyContent="space-between"
        pb={5}
        alignItems="center"
        px={5}
        space={2}
      >
        <Image
          alt=""
          source={Base}
          width={250}
          height={250}
          borderRadius={100}
        />
        <Column w="full" space={2}>
          <Input
            autoFocus
            isFocused
            onChangeText={(text) => handleInputChange("enteredCode", text)}
            keyboardType="numeric"
            maxLength={8}
            icon="mail-outline"
            label="کد پیامک شده را وارد کنید"
            placeholder="13456"
          />

          <Input
            onChangeText={(text) => handleInputChange("password", text)}
            placeholder="*******"
            icon="lock-closed-outline"
            label="کلمه عبور را وارد کنید"
            secureTextEntry
          />

          <Button
            isLoading={isLoading}
            onPress={handleLogin}
            scheme="success"
            title="ورود"
          />
          <Button
            isLoading={againLoading}
            onPress={() => sendCodeAgain(params.phone)}
            scheme="warning"
            isDisabled={timer > 0}
            title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
          />
        </Column>
      </Column>
    </Container>
  );
};

export default Login;
