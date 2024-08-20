import { User } from "@prisma/client";

export type UserModel = {
  username: string;
  name: string;
};

export type UserRequest = {
  username: string;
  name: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type AuthenticateRequest = {
  username: string;
  password: string;
};
