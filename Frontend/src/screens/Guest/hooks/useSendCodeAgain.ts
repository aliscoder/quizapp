import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useSendCodeAgain = () => {
  const [timer, setTimer] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!timer) return;
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const sendCodeAgain = useCallback(async (mobile: string) => {
    setLoading(true);
    await axios
      .post(
        "https://raygansms.com/AutoSendCode.ashx",
        {
          UserName: "shaludama",
          Password: "Ali8825512217",
          Mobile: mobile,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .finally(() => {
        setTimer(120);
        setLoading(false);
      });
  }, []);

  return { sendCodeAgain, isLoading, timer };
};

export default useSendCodeAgain;
