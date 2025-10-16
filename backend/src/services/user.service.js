import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};
