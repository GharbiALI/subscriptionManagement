import { Request, Response } from "express";
import { registerUser, getUserByEmail } from "../services/user.services";
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

    const user = (await registerUser(name, email, password)) as  IUser & { _id: unknown };

    const token = generateToken(user._id as any, user.role);

     return res.status(201).json({
      user: mapUserResponse(user),
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: "Failed to register user" });
  }
};

