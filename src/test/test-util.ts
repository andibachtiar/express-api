import { prisma } from "../application/database";
import bcrypt from "bcrypt";
import { JwtService } from "../application/service/jwt-service";
import { AuthenticateRequest } from "../application/model/user-model";

export class UserTest {
  static async delete() {
    await prisma.user.deleteMany({
      where: { username: "testing" },
    });
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "testing",
        name: "testing",
        password: await bcrypt.hash("testing", 10),
      },
    });
  }

  static async createAuthToken() {
    return JwtService.generateToken({
      username: "testing",
      name: "testing",
    });
  }

  static async getUser() {
    const user = await prisma.user.findFirst({
      where: {
        username: "testing",
      },
    });

    return (
      user ?? {
        username: "",
        password: "",
      }
    );
  }
}
