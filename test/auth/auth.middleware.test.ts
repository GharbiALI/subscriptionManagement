import dotenv from "dotenv";
import mongoose from "mongoose";
import { Response, NextFunction } from "express";
import {
  authenticate,
  authorizeAdmin,
  AuthRequest,
} from "../../src/auth/auth.middleware";
import { generateToken } from "../../src/auth/auth.services";

dotenv.config();

describe("Auth Middleware", () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe("authenticate", () => {
    it("should return 401 when no authorization header is provided", () => {
      // given
      req = { headers: {} };

      // when
      authenticate(req as AuthRequest, res as Response, next);

      // then
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unauthorized: No token provided",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 when the token is invalid", () => {
      // given
      req = { headers: { authorization: "Bearer invalid.token.value" } };

      // when
      authenticate(req as AuthRequest, res as Response, next);

      // then
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unauthorized: Invalid or expired token",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should attach decoded user and call next for a valid token", () => {
      // given
      const token = generateToken(new mongoose.Types.ObjectId(), "user");
      req = { headers: { authorization: `Bearer ${token}` } };

      // when
      authenticate(req as AuthRequest, res as Response, next);

      // then
      expect(next).toHaveBeenCalled();
      expect(req.user).toMatchObject({ role: "user" });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("authorizeAdmin", () => {
    it("should return 403 when the authenticated user is not an admin", () => {
      // given
      req = { user: { userId: "123", role: "user" } } as AuthRequest;

      // when
      authorizeAdmin(req as AuthRequest, res as Response, next);

      // then
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Forbidden: Admin access required",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next when the authenticated user is an admin", () => {
      // given
      req = { user: { userId: "123", role: "admin" } } as AuthRequest;

      // when
      authorizeAdmin(req as AuthRequest, res as Response, next);

      // then
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
