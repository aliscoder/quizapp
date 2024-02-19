import { Request, Response } from "express";
import ZarinPalCheckout from "zarinpal-checkout";
import Financial from "../models/Financial";
import User from "../models/User";

const zarinpal = ZarinPalCheckout.create(
  "db8f24c3-3806-4e20-92c0-3d6178bf9cd8",
  false
);

export const depositCoin = async (req: Request, res: Response) => {
  const { amount, userId } = req.body;
  zarinpal
    .PaymentRequest({
      Amount: Number(amount), // In Tomans
      CallbackURL: "http://localhost:3000/financial/verify-deposit",
      Description: "pay coin",
    })
    .then(async (response) => {
      if (response.status === 100) {
        Financial.create({
          amount: Number(amount),
          userId,
          secret: response.authority,
          type: 'deposit'
        }).then(() => {
          res.status(200).json({ url: response.url });
        });
      }
    })
    .catch((err) => {
      res.status(400).json("خطا در برقراری ارتباط");
    });
};

export const verifyDeposit = async (req: Request, res: Response) => {
  const { Authority } = req.query;

  const deposit = await Financial.findOne({ secret: Authority });

  zarinpal
    .PaymentVerification({
      Amount: deposit.amount,
      Authority: Authority.toString(),
    })
    .then(async (response) => {
      if (response.status == 101) {
        await User.findByIdAndUpdate(deposit.userId, {
          $inc: { coin: deposit.amount },
        });
        await Financial.findOneAndUpdate(
          { secret: Authority },
          {
            $set: { status: "done" },
          }
        );
        res.status(200).json("done");
      } else {
        await Financial.findOneAndUpdate(
          { secret: Authority },
          {
            $set: { status: "rejected" },
          }
        );
        res.redirect("exp://");
      }
    })
    .catch(async (err) => {
      await Financial.findOneAndUpdate(
        { secret: Authority },
        {
          $set: { status: "rejected" },
        }
      );
      res.redirect("exp://");
    });
};

export const makeCashout = async (req: Request, res: Response) => {
  const { amount, userId } = req.body;
  const user = await User.findById(userId)

  if (amount > user.coins) {
    res.status(400).json({ error: 'مبلغ وارد شده بیشتر از موجودی شماست' })
  } else {
    const cashout = new Financial({
      amount,
      userId,
      type: 'cashout'
    })

    await cashout.save()

    res.status(200).json('Done')

  }

};

export const getFinancials = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const financials = await Financial.find({userId})

  
    res.status(200).json(financials)

  

};

export const completeFinacialAccount = async (req: Request, res: Response) => {
  const { sheba , card , owner, userId } = req.body;
  const user = await User.findById(userId)

  if (!sheba || !card || !owner || !userId) {
    res.status(400).json({ error: 'اطلاعات نامعتبر است' })
  } else {
    user.financial.card = card;
    user.financial.sheba = sheba;
    user.financial.owner = owner;
    
    await user.save()

    res.status(200).json('Done')

  }

};


