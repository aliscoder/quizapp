import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.defineProperty(err, "message", { enumerable: true });
  console.log({ req, res, level: "error", message: err.message });
  res.status(500).json(err);
};

export default errorHandler;
