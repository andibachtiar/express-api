import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  AuthenticateRequest,
  UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { User } from "@prisma/client";

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

  static get(req: Request, res: Response) {
    const user = UserService.getUser(req);

    return res.status(200).json({
      data: user,
    });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = UserService.getUser(req) as User;
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(user, request);

      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
