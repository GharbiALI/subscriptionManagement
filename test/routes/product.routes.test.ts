import request from "supertest";
import dotenv from "dotenv";
import { Types } from "mongoose";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";
import { Product } from "../../src/schemas/product.schemas";
import { generateToken } from "../../src/auth/auth.services";

dotenv.config();

jest.setTimeout(30000);

describe("Product routes integration", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  describe("GET /api/product", () => {
    it("should return 200 with active products", async () => {
      await Product.create([
        {
          name: "AI Model Subscription",
          companyName: "Chat GPT",
          price: 49.99,
          description: "Access to generative AI model endpoints",
          isActive: true,
        },
      ]);

      const res = await request(app).get("/api/product");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toEqual(
        expect.objectContaining({
          name: "AI Model Subscription",
          companyName: "Chat GPT",
          price: 49.99,
          description: "Access to generative AI model endpoints",
          isActive: true,
        }),
      );
    });
  });

  describe("POST /api/product", () => {
    const adminToken = `Bearer ${generateToken(new Types.ObjectId(), "admin")}`;

    it("should create a new product when input is valid and user is admin", async () => {
      const payload = {
        name: "AI Analytics API",
        companyName: "Bard",
        price: 79.99,
        description: "Subscription to AI analytics models",
        isActive: true,
      };

      const res = await request(app)
        .post("/api/product")
        .set("Authorization", adminToken)
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toMatchObject(payload);
    });

    it("should return 400 when product input is invalid", async () => {
      const invalidPayload = {
        name: "",
        companyName: "",
        price: -10,
      };

      const res = await request(app)
        .post("/api/product")
        .set("Authorization", adminToken)
        .send(invalidPayload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(Array.isArray(res.body.error)).toBe(true);
      expect(res.body.error).toEqual(
        expect.arrayContaining([
          "Product name is required",
          "Company name is required",
          "Price must be a positive number",
        ]),
      );
    });
  });
});
