import { generateToken, JwtPayload } from "../../src/auth/auth.services";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("Auth Services", () => {
  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      //given
      const userId = new mongoose.Types.ObjectId();
      const role = "user";

      //when
      const token = generateToken(userId, role);

      //then
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
    });

    it("should generate different tokens for different users", () => {
      //given
      const userId1 = new mongoose.Types.ObjectId();
      const userId2 = new mongoose.Types.ObjectId();
      //when
      const token1 = generateToken(userId1, "user");
      const token2 = generateToken(userId2, "user");
      //then
      expect(token1).not.toBe(token2);
    });
  });
});
