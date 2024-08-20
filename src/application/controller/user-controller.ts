import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, AuthenticateRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);

      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AuthenticateRequest = req.body as AuthenticateRequest;
      const response = await UserService.authenticate(request);

      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
