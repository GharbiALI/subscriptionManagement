import request from "supertest";
import dotenv from "dotenv";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";
import { Product } from "../../src/schemas/product.schemas";

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

    });
  });
});
