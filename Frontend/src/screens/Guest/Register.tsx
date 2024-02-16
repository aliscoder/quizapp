import { Button, Column, Container, Input } from "@components";
import React from "react";
import useRegister from "./hooks/useRegister";
import useSendCodeAgain from "./hooks/useSendCodeAgain";
import { Image } from "native-base";
import { Base } from "@utils";

const Register = () => {
  const { handleInputChange, isLoading, formData, handleRegister } = useRegister();
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();

  return (
    <Container bodyPadded={false} isInSafeArea={0} pt={4}>
      <Column
        h="full"
        w="full"
        justifyContent="space-between"
        pb={5}
        alignItems="center"
        px={5}
        space={2}
      >
        <Image alt="" source={Base} width={200} height={200} borderRadius={100} />
        <Column w="full" space={2}>
        <Input
          onChangeText={(text) => handleInputChange("enteredCode", text)}
          keyboardType="numeric"
          value={formData.enteredCode?.toLocaleString()}
          maxLength={8}
          label="کد پیامک شده را وارد کنید"
          placeholder="13456"
        />
        <Input
          onChangeText={(text) => handleInputChange("username", text)}
          label="نام کاربری خود را وارد کنید"
          placeholder="user"
        />
        <Input
          onChangeText={(text) => handleInputChange("password", text)}
          placeholder="*******"
          label="کلمه عبور را وارد کنید"
          secureTextEntry
        />

        <Input
          onChangeText={(text) => handleInputChange("repassword", text)}
          placeholder="*******"
          label="تکرار کلمه عبور"
          secureTextEntry
        />
        <Button scheme="success" isLoading={isLoading} onPress={handleRegister} title="ثبت نام" />

        <Button
          isLoading={againLoading}
          onPress={() => sendCodeAgain(formData.phone)}
          scheme="warning"
          isDisabled={timer > 0}
          title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
        />
      </Column>
     </Column>
    </Container>
  );
};

export default Register;
