import * as jwt from "jsonwebtoken";
import { UserModel } from "../model/user-model";
import { AppConfig } from "../config/app-config";
import { ResponseError } from "../error/response-error";

export class JwtService {
  static generateToken(user: UserModel) {
    return jwt.sign(user, AppConfig.jwt.token, {
      expiresIn: 60 * AppConfig.jwt.expire,
    });
  }

  static verify(token: string) {
    return jwt.verify(token, AppConfig.jwt.token);
  }
}
