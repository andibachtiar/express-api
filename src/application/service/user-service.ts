import { prisma } from "../database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

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
}
