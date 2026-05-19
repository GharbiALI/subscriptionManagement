import request from "supertest";
import dotenv from "dotenv";
import app from "../../src/app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "../db.config";
dotenv.config();

describe("POST /api/user/register (integration)", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

   afterAll(async () => {
    await disconnectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  const validPayload = {
    name: "Alice",
    email: "alice@example.com",
    password: "password123",
  };

  it("should return 201 with user and token on successful registration", async () => {
    //given (validPayload)
    //when
    const res = await request(app).post("/api/user/register").send(validPayload);
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
    //given (validPayload)
    //when
      const res = await request(app).post("/api/user/register").send(validPayload);
    //then
     expect(res.body.user).not.toHaveProperty("password");
  });
 
});