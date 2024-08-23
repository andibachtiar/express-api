import { db } from "../config/database.config";

const ContactSchema = new db.Schema({
  email: {
    type: String,
    unique: true,
  },
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

const UserSchema = new db.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  password: String,
  contacts: [ContactSchema],
});

export const UserModel = db.model("User", UserSchema);
