import { prisma } from "../database";
import { ResponseError } from "../error/response-error";
import {
  AuthenticateRequest,
  CreateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { JwtService } from "./jwt-service";

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
}
