import express from "express";
import {
  ChangePassword,
  Login,
  refreshToken,
  register,
  sendVerificationCode,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/refresh_token", refreshToken);
authRouter.post("/send_code", sendVerificationCode);
authRouter.post("/login", Login);
authRouter.post("/register", register);
authRouter.put("/changePass", ChangePassword);

export default authRouter;
