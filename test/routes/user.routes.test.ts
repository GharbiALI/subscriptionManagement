import request from "supertest";
import dotenv from "dotenv";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";
dotenv.config();
jest.setTimeout(30000);

describe("User routes integration", () => {
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
    password: "password123",
  };

  describe("POST /api/user/register", () => {
    it("should return 201 with user and token on successful registration", async () => {
      //given(validRegisterPayload)
      //when
      const res = await request(app)
        .post("/api/user/register")
        .send(validRegisterPayload);

      //then
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
    });

    it("should not expose the password in the response", async () => {
      //given(validRegisterPayload)
      //when
      const res = await request(app)
        .post("/api/user/register")
        .send(validRegisterPayload);

      //then
      expect(res.status).toBe(201);
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 409 when the email is already registered", async () => {
      //given(validRegisterPayload)
      //when
      await request(app).post("/api/user/register").send(validRegisterPayload);

      const secondResponse = await request(app)
        .post("/api/user/register")
        .send(validRegisterPayload);
      //then
      expect(secondResponse.status).toBe(409);
      expect(secondResponse.body).toHaveProperty(
        "error",
        "Email already in use",
      );
    });
  });

  describe("POST /api/user/login", () => {
    const validLoginPayload = {
      email: "alice@example.com",
      password: "password123",
    };

    it("should return 200 with user and token on successful login", async () => {
      //given(validLoginPayload)
      //when
      await request(app).post("/api/user/register").send(validRegisterPayload);
      const res = await request(app)
        .post("/api/user/login")
        .send(validLoginPayload);
      //then

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 401 for invalid password", async () => {
      //given(validLoginPayload)
      //when
      await request(app).post("/api/user/register").send(validRegisterPayload);
      const res = await request(app)
        .post("/api/user/login")
        .send({ email: "alice@example.com", password: "wrongpass123" });
      //then

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 401 when the user does not exist", async () => {
      //given(validLoginPayload)
      //when
      const res = await request(app)
        .post("/api/user/login")
        .send(validLoginPayload);
      //then
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 400 when login data is invalid", async () => {
      //given(invalidLoginPayload)
      //when
      const res = await request(app)
        .post("/api/user/login")
        .send({ email: "invalid-email", password: "short" });
      //then
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("A valid email is required");
      expect(res.body.error).toContain(
        "Password must be at least 8 characters",
      );
    });
  });

  describe("GET /api/user/profile", () => {
    it("should return 200 with the authenticated user's profile", async () => {
      await request(app).post("/api/user/register").send(validRegisterPayload);
      const loginRes = await request(app)
        .post("/api/user/login")
        .send({ email: "alice@example.com", password: "password123" });

      const res = await request(app)
        .get("/api/user/profile")
        .set("Authorization", `Bearer ${loginRes.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toMatchObject({
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      });
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should return 401 when no authorization token is provided", async () => {
      const res = await request(app).get("/api/user/profile");

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty(
        "message",
        "Unauthorized: No token provided",
      );
    });
  });
});
