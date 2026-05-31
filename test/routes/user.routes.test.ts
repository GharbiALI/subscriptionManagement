import request from "supertest";
import dotenv from "dotenv";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";

dotenv.config();
jest.setTimeout(30000);

describe("User/Auth routes integration", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  const validRegisterPayload = {
    name: "Alice",
    email: "alice@example.com",
    password: "Password123!",
  };

  describe("POST /api/auth/registration", () => {
    it("should return 201 with user and token on successful registration", async () => {
      // When
      const res = await request(app)
        .post("/api/auth/registration")
        .send(validRegisterPayload);

      // Then
      expect(res.status).toBe(201);
      expect(res.body.user).toHaveProperty("token");
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
    });

    it("should not expose the password in the response", async () => {
      // When 
      const res = await request(app)
        .post("/api/auth/registration")
        .send(validRegisterPayload);

      // Then
      expect(res.status).toBe(201);
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 409 when the email is already registered", async () => {
      // When 
      await request(app).post("/api/auth/registration").send(validRegisterPayload);

      const secondResponse = await request(app)
        .post("/api/auth/registration")
        .send(validRegisterPayload);
      
      // Then
      expect(secondResponse.status).toBe(409);
      expect(secondResponse.body).toHaveProperty(
        "error",
        "Email already in use",
      );
    });
  });

  describe("POST /api/auth/login", () => {
    const validLoginPayload = {
      email: "alice@example.com",
      password: "Password123!",
    };

    it("should return 200 with user and token on successful login", async () => {
      // When 
      await request(app).post("/api/auth/registration").send(validRegisterPayload);
      const res = await request(app)
        .post("/api/auth/login")
        .send(validLoginPayload);

      // Then
      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty("token");
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 401 for invalid password", async () => {
      // When
      await request(app).post("/api/auth/registration").send(validRegisterPayload);
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "WrongPass123!" });

      // Then
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 401 when the user does not exist", async () => {
      // When 
      const res = await request(app)
        .post("/api/auth/login")
        .send(validLoginPayload);
      
      // Then
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 400 when login data is invalid", async () => {
      // When 
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "invalid-email", password: "short" });
      
      // Then
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("A valid email is required");
      expect(res.body.error).toContain(
        "Password must be at least 12 characters and include uppercase, lowercase, number and symbol",
      );
    });
  });

  describe("GET /api/users/profile", () => {
    it("should return 200 with the authenticated user's profile", async () => {

      await request(app).post("/api/auth/registration").send(validRegisterPayload);
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "alice@example.com", password: "Password123!" });

      // When 
      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${loginRes.body.user.token}`);

      // Then
      expect(res.status).toBe(200);
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 401 when no authorization token is provided", async () => {
      // When 
      const res = await request(app).get("/api/users/profile");

      // Then
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty(
        "message",
        "Unauthorized: No token provided",
      );
    });
  });
});