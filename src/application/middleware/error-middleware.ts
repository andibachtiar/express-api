import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation error
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error,
    });

    // response error
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });

    // default error
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
