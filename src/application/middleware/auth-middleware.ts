import { NextFunction, Request, Response } from "express";
import { JwtService } from "../service/jwt-service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authToken = (authHeader && authHeader.split(" ")[1]) || "";

  if (!authToken) {
    res.status(401).json({
      errors: "Unauthorized",
    });
  }

  const user = JwtService.verify(authToken);

  if (user && typeof user !== "string") {
    JwtService.generateToken({
      username: user.username,
      name: user.name,
    });

    next();
  } else {
    res.status(401).json({
      errors: "Unauthorized",
    });
  }
};
