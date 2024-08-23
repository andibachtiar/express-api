import { prisma } from "../database";
import { ResponseError } from "../error/response-error";
import {
  AuthenticateRequest,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { JwtService } from "./jwt-service";
import { Request } from "express";
import { UserModel } from "../model/user.model";
import { User } from "@prisma/client";

export class UserService {
  static async register(request: CreateUserRequest) {
    const validated = Validation.validate(UserValidation.REGISTER, request);

    const user = new UserModel({
      username: validated.username,
      password: await bcrypt.hash(validated.password, 10),
      name: validated.name,
    });

    return user.save();
  }

  static async authenticate(request: AuthenticateRequest) {
    const validated = Validation.validate(UserValidation.LOGIN, request);

    const user = await UserModel.findOne({
      username: validated.username,
    }).exec();

    if (!user) {
      throw new ResponseError(401, "Authentication failed");
    }

    const isPasswordMatched = await bcrypt.compare(
      validated.password,
      user.password || ""
    );

    if (!isPasswordMatched) {
      throw new ResponseError(401, "Authentication failed");
    }

    const token = JwtService.generateToken({
      username: user.username || "",
      name: user.name || "",
    });

    const response: UserResponse = {
      username: user.username || "",
      name: user.name || "",
      token,
    };

    return response;
  }

  static getUser(req: Request) {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    if (authToken) {
      const user = JwtService.verify(authToken);

      if (typeof user !== "string") {
        return {
          name: user.name,
          username: user.username,
        };
      }
    }
  }

  static async update(user: User, request: UpdateUserRequest) {
    const validated = Validation.validate(UserValidation.UPDATE, request);

    if (validated.password) {
      validated.password = await bcrypt.hash(validated.password, 10);
    }

    const updated = await UserModel.updateOne(
      {
        username: user.username,
      },
      {
        $set: {
          validated,
        },
      }
    );

    return updated;
  }
}
