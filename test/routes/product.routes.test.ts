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

  describe("GET /api/products", () => {
    it("should return 200 with active products", async () => {
      // Given
      await Product.create([
        {
          name: "AI Model Subscription",
          companyName: "Chat GPT",
          price: 49.99,
          description: "Access to generative AI model endpoints",
          isActive: true,
        },
      ]);

      // When
      const res = await request(app).get("/api/products");

      // Then
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

  describe("POST /api/products", () => {
    const adminToken = `Bearer ${generateToken(new Types.ObjectId(), "admin")}`;

    it("should create a new product when input is valid and user is admin", async () => {
      // Given
      const payload = {
        name: "AI Analytics API",
        companyName: "Bard",
        price: 79.99,
        description: "Subscription to AI analytics models",
        isActive: true,
      };

      // When
      const res = await request(app)
        .post("/api/products")
        .set("Authorization", adminToken)
        .send(payload);

      // Then
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toMatchObject(payload);
    });

    it("should return 400 when product input is invalid", async () => {
      // Given
      const invalidPayload = {
        name: "",
        companyName: "",
        price: -10,
      };

      // When
      const res = await request(app)
        .post("/api/products")
        .set("Authorization", adminToken)
        .send(invalidPayload);

      // Then
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

  describe("PUT /api/products/:id", () => {
    const adminToken = `Bearer ${generateToken(new Types.ObjectId(), "admin")}`;

    it("should update a product when id and body are valid", async () => {
      // Given
      const product = await Product.create({
        name: "AI Model Subscription",
        companyName: "Chat GPT",
        price: 49.99,
        description: "Access to generative AI model endpoints",
        isActive: true,
      });

      const updatePayload = {
        price: 59.99,
        description: "Updated access to generative AI model endpoints",
      };

      // When
      const res = await request(app)
        .put(`/api/products/${product._id.toString()}`)
        .set("Authorization", adminToken)
        .send(updatePayload);

      // Then
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });

    it("should return 400 when product id is invalid", async () => {
      // Given
      const invalidId = "invalid-id";

      // When 
      const res = await request(app)
        .put(`/api/products/${invalidId}`)
        .set("Authorization", adminToken)
        .send({ price: 59.99 });

      // Then
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid product ID");
    });
  });

  describe("DELETE /api/products/:id", () => {
    const adminToken = `Bearer ${generateToken(new Types.ObjectId(), "admin")}`;

    it("should soft delete a product when id is valid and user is admin", async () => {
      // Given
      const product = await Product.create({
        name: "AI Model Subscription",
        companyName: "Chat GPT",
        price: 49.99,
        description: "Access to generative AI model endpoints",
        isActive: true,
      });

      // When 
      const res = await request(app)
        .delete(`/api/products/${product._id.toString()}`)
        .set("Authorization", adminToken);

      // Then
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toEqual(
        expect.objectContaining({
          name: "AI Model Subscription",
          companyName: "Chat GPT",
          price: 49.99,
          description: "Access to generative AI model endpoints",
          isActive: false,
        }),
      );

      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct).not.toBeNull();
      expect(updatedProduct?.isActive).toBe(false);
    });

    it("should return 404 when product does not exist", async () => {
      // Given
      const nonExistingId = new Types.ObjectId().toString();

      // When 
      const res = await request(app)
        .delete(`/api/products/${nonExistingId}`)
        .set("Authorization", adminToken);

      // Then
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Product not found");
    });

    it("should return 409 when product is already deleted", async () => {
      // Given
      const product = await Product.create({
        name: "AI Model Subscription",
        companyName: "Chat GPT",
        price: 49.99,
        description: "Access to generative AI model endpoints",
        isActive: false,
      });

      // When
      const res = await request(app)
        .delete(`/api/products/${product._id.toString()}`)
        .set("Authorization", adminToken);

      // Then
      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty("error", "Product is already deleted");
    });

    it("should return 400 when product id is invalid", async () => {
      // Given
      const invalidId = "invalid-id";

      // When
      const res = await request(app)
        .delete(`/api/products/${invalidId}`)
        .set("Authorization", adminToken);

      // Then
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid product ID");
    });
  });
});