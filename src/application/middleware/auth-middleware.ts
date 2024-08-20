import { NextFunction, Request, Response } from "express";
import { JwtService } from "../service/jwt-service";

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

  const user = JwtService.verify(authToken);

  if (!user || typeof user === "string") {
    return res.status(301).json({
      errors: "unauthorized ",
    });
  } else {
    JwtService.generateToken({
      username: user.username,
      name: user.name,
    });

    next();
  }
};

export const guestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];

  if (authToken && typeof authToken !== "undefined") {
    const user = JwtService.verify(authToken);

    if (user && typeof user !== "string") {
      res.status(301).json({
        data: user,
      });
    }
  }

  next();
};
