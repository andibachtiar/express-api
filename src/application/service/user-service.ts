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
import { User } from "@prisma/client";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const validated = Validation.validate(UserValidation.REGISTER, request);

    const isRegistered = await prisma.user.count({
      where: {
        username: validated.username,
      },
    });

    if (isRegistered) {
      throw new ResponseError(400, "Username is taken");
    }

    const created: UserResponse = await prisma.user.create({
      data: {
        username: validated.username,
        password: await bcrypt.hash(validated.password, 10),
        name: validated.name,
      },
    });

    return created;
  }

  static async authenticate(
    request: AuthenticateRequest
  ): Promise<UserResponse> {
    const validated = Validation.validate(UserValidation.LOGIN, request);
    // return;
    const user = await prisma.user.findFirst({
      where: {
        username: validated.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Authentication failed");
    }

    const isPasswordMatched = await bcrypt.compare(
      validated.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new ResponseError(401, "Authentication error");
    }

    const token = JwtService.generateToken({
      username: user.username,
      name: user.name,
    });

    const response: UserResponse = {
      username: user.username,
      name: user.name,
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

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const validated = Validation.validate(UserValidation.UPDATE, request);
    console.log(validated);

    user.name = validated.name ? validated.name : user.name;
    user.password = validated.password
      ? await bcrypt.hash(validated.password, 10)
      : user.password;

    // console.log(validated);

    const updated = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return updated;
  }
}
