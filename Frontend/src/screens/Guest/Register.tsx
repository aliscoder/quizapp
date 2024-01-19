import { Button, Column, Container, Input, Select } from "@components";
import { useShop } from "@hooks";
import React from "react";
import BaseImage from "./components/GuestBackgroundImage";
import useRegister from "./hooks/useRegister";
import useSendCodeAgain from "./hooks/useSendCodeAgain";

const Register = () => {
  const { handleInputChange, isLoading, formData, handleRegister } = useRegister();
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();

  return (
    <Container bodyPadded={false} isInSafeArea pt={2}>
      <Column space={3} p={3}>
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
      <BaseImage height={450} />
    </Container>
  );
};

export default Register;
