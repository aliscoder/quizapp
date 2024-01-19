import express from "express";
import { depositCoin, verifyDeposit } from "../controllers/deposit";

const depositRouter = express.Router();

depositRouter.post("/", depositCoin);
depositRouter.get("/verify", verifyDeposit);

export default depositRouter;
