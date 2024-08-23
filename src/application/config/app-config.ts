import dotenv from "dotenv";

dotenv.config();

let jwtExpire = 0;
if (typeof process.env.JWT_TOKEN_EXPIRE === "string") {
  jwtExpire = parseInt(process.env.JWT_TOKEN_EXPIRE);
}

export const AppConfig = {
  jwt: {
    token: process.env.JWT_TOKEN_EXPIRE || "",
    expire: jwtExpire || 60,
  },

  database: {
    url: process.env.DATABASE_URL || "",
    dbName: process.env.DATABASE_NAME || undefined,
    username: process.env.DATABASE_USERNAME || undefined,
    password: process.env.DATABASE_PASSWORD || undefined,
  },
};
