import axios from "axios";
import { setItem } from "./storage";
import unix from "./unix";

export async function sendVerificationSMS(mobile: string) {
  await axios.post(
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
  );

  await setItem("smsTimer", (unix() + 600).toString());
}

export async function checkVerificationSMS({ mobile, code }: { mobile: string; code: string }) {
  const res = await axios.post(
    "https://raygansms.com/CheckSendCode.ashx",
    {
      UserName: "shaludama",
      Password: "Ali8825512217",
      Mobile: mobile,
      Code: code,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data;
}
