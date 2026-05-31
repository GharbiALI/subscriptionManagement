import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../auth/auth.middleware";
import {
  registerUser,
  getUserByEmail,
  getUserById,
} from "../services/user.services";
import { mapUserResponse } from "../mapper/user.mapper";
import { generateToken } from "../auth/auth.services";
import { IUser } from "../schemas/user.schemas";

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const existing = await getUserByEmail(email);

    if (existing) {
      return res.status(409).json({
        error: "Email already in use",
      });
    }

    const user = (await registerUser(name, email, password)) as IUser & {
      _id: unknown;
    };

    const token = generateToken(user._id as any, user.role);

    return res.status(201).json({
      user: mapUserResponse(user, token),
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to register user" });
  }
};
export const profile = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user: mapUserResponse(user) });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};
export const login = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    const user = (await getUserByEmail(email)) as
      | (IUser & { _id: unknown })
      | null;

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = generateToken(user._id as any, user.role);

    return res.status(200).json({
      user: mapUserResponse(user, token),
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to login" });
  }
};
  