import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { TokenExpiredError } from "jsonwebtoken";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error,
    });
    return;
    // response error
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
    return;
    // default error
  } else if (error instanceof TokenExpiredError) {
    res.status(500).json({
      errors: "JWT nih bos",
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
    return;
  }
};
