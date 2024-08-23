import mongoose from "mongoose";
import { AppConfig } from "./app-config";

export const db = mongoose;

db.connect(AppConfig.database.url, {
  dbName: AppConfig.database.dbName,
  user: AppConfig.database.username,
  pass: AppConfig.database.password,
  autoIndex: true,
  autoCreate: true,
});
