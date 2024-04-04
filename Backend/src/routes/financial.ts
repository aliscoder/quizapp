import express from "express";
import { depositCoin, verifyDeposit,makeCashout, getFinancials, completeFinacialAccount } from "../controllers/financial";

const depositRouter = express.Router();

depositRouter.get("/:userId", getFinancials);
depositRouter.post("/deposit", depositCoin);
depositRouter.get("/verify/deposit", verifyDeposit);
depositRouter.post("/cashout", makeCashout);
depositRouter.post("/complete-account", completeFinacialAccount);

export default depositRouter;
 