import { useAuth, useToast } from "@hooks";
import { RegisterScreenRouteProp } from "@navigation/utils/types";
import { useRoute } from "@react-navigation/core";
import { RegisterFormInterface, useRegisterMutation } from "@state/api/auth";
import { UserInterface } from "@types";
import { useCallback, useEffect, useState } from "react";

const useRegister = () => {
  const { authenticate } = useAuth();
  const { params } = useRoute<RegisterScreenRouteProp>();
  const { phone } = params;
  const { showError } = useToast();

  const [formData, setFormData] = useState<RegisterFormInterface>({
    phone,
    username: "",
    enteredCode: "",
    password: "",
    repassword: "",
  });

  const { enteredCode, username, password, repassword } = formData;

  const [register, { isLoading, isError, isSuccess, data, error }] = useRegisterMutation();

  const handleInputChange = useCallback((item: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }, []);

  const handleBarberChange = useCallback((item: UserInterface) => {
    setFormData((prev) => ({ ...prev, barberId: item._id }));
  }, []);

  async function handleRegister() {
    if (username.length < 3 || username.length > 20) {
      showError("نام وارد شده نامعتبر است");
    } else if (password.length < 3 || password !== repassword) {
      showError("کلمه عبور نامعتبر است");
    } else {
      register({ phone, username, enteredCode, password });
    }
  }

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      showError(error.data.error);
    }
    if (isSuccess && data) {
      authenticate(data);
    }
  }, [isError, isSuccess]);

  return {
    handleRegister,
    handleInputChange,
    formData,
    token: data?.token,
    isLoading,
    handleBarberChange,
  };
};

export default useRegister;
