import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword, createPassword } from "../utils/password";
import { PRIVATE_KEY } from "../data";
import { faker } from "@faker-js/faker";

// CHECK INITIAL STATUS
export const refreshToken = async (req: Request, res: Response) => {
  const { id: _id } = req.body;
  const user = await User.findById(_id);
  delete user.password;
  delete user.financial;

  const token = jwt.sign({ userId: user._id }, PRIVATE_KEY);
  res.status(200).json({ token, user });
};

// SEND GENERETAED VERIFICATION CODE
export const sendVerificationCode = async (req: Request, res: Response) => {
  const { phone } = req.body;
  // axios.post(
  //   "https://raygansms.com/AutoSendCode.ashx",
  //   {
  //     UserName: "shaludama",
  //     Password: "Ali8825512217",
  //     Mobile: phone,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   }
  // );
  const user = await User.findOne({ phone });
  res.status(200).json({ status: user ? "login" : "register" });
};

export const register = async (req: Request, res: Response) => {
  const { phone, username, password, code } = req.body;

  // const SMSresponse = await axios.post(
  //   "https://raygansms.com/CheckSendCode.ashx",
  //   {
  //     UserName: "shaludama",
  //     Password: "Ali8825512217",
  //     Mobile: phone,
  //     Code: code,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   }
  // );

  // if (!SMSresponse.data) {
  //   res.status(400).json({ error: "کد وارد شده نامعتبر است" });
  // } else {

  const user = new User();
  user.phone = phone;
  user.username = username;
  user.coins = 500000;
  user.avatar = faker.image.avatar();
  user.password = await createPassword(password);

  const newUser = await user.save();

  delete user.password;
  delete user.financial;

  const token = jwt.sign({ userId: newUser._id }, PRIVATE_KEY);
  res.status(200).json({ token, user: newUser });
  // }
};

// LOGIN CLIENT
export const Login = async (req: Request, res: Response) => {
  const { phone, password, code } = req.body;

  const userExist = Boolean(await User.exists({ phone }));

  // const SMSresponse = await axios.post(
  //   "https://raygansms.com/CheckSendCode.ashx",
  //   {
  //     UserName: "shaludama",
  //     Password: "Ali8825512217",
  //     Mobile: phone,
  //     Code: enteredCode,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   }
  // );

  // if (!SMSresponse.data) {
  //   res.status(400).json({ error: "کد وارد شده نامعتبر است" });
  // } else {
  if (!password || !userExist) {
    res.status(400).json({ error: "اطلاعات نامعتبر است" });
  } else {
    const user = await User.findOne({ phone });
    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "اطلاعات نامعتبر است" });
    } else {
      delete user.password;
      delete user.financial;
      const token = jwt.sign({ userId: user._id }, PRIVATE_KEY);
      res.status(200).json({ token, user });
    }
  }

  // }
};

export const ChangePassword = async (req: Request, res: Response) => {
  const { userId, newPassword, currentPassword } = req.body;

  const user = await User.findById(userId);

  const isPasswordValid = await checkPassword(currentPassword, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ error: "کلمه عبور فعلی نامعتبر است" });
  } else {
    user.password = await createPassword(newPassword);
    await user.save();
    res.status(200).json("Done");
  }
};

export async function getAuthUser(req: Request, res: Response) {
  const { userId } = req.params;

  const user = await User.findById(userId);
  delete user.password;
  delete user.financial;

  res.status(200).json({ user });
}
