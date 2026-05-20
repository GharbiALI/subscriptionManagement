import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repository/user.repository";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  return findUserByEmail(email);
};

export const getUserById = async (id: string) => {
  return findUserById(id);
};
