import { NextFunction, Request, Response } from "express";
import { JwtService } from "../service/jwt-service";
import { GeneralError } from "../type/generic-type";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const authToken = (authHeader && authHeader.split(" ")[1]) || "";

  if (authToken === undefined || authToken === null || authToken === "") {
    return res.status(401).json({
      errors: "user unauthenticated",
    });
  }

  try {
    JwtService.verify(authToken);
    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(501).json({
        errors: e.message,
      });
    }
  }
};

export const guestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];

  if (authToken) {
    try {
      JwtService.verify(authToken);
    } catch (e) {
      res.status(300);
    }
  }
  next();
};
