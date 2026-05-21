import request from "supertest";
import dotenv from "dotenv";
import { Types } from "mongoose";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";
import { Subscription } from "../../src/schemas/subscription.schemas";
import { Product } from "../../src/schemas/product.schemas";
import { generateToken } from "../../src/auth/auth.services";

dotenv.config();

jest.setTimeout(30000);

describe("Subscription routes integration", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  describe("GET /api/subscription/expired", () => {
    it("should return 200 with expired subscriptions", async () => {
      // Given
      const userId = new Types.ObjectId();
      const token = `Bearer ${generateToken(userId, "user")}`;

      const product = await Product.create({
        name: "AI Model",
        companyName: "Chat GPT",
        price: 49.99,
        description: "AI model",
        isActive: true,
      });

      await Subscription.create({
        userId,
        productId: product._id,
        startDate: new Date(),
        expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "expired",
      });

      // When
      const res = await request(app)
        .get("/api/subscription/expired")
        .set("Authorization", token);

      // Then
      expect(res.status).toBe(200);
    });

    it("should return 200 with empty array when user has no expired subscriptions", async () => {
      // Given
      const userId = new Types.ObjectId();
      const token = `Bearer ${generateToken(userId, "user")}`;

      // When
      const res = await request(app)
        .get("/api/subscription/expired")
        .set("Authorization", token);

      // Then
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });

    it("should return 401 when no token is provided", async () => {
      // When
      const res = await request(app).get("/api/subscription/expired");

      // Then
      expect(res.status).toBe(401);
    });
  });
});