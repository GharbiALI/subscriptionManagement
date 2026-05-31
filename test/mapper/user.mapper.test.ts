import { mapUserResponse } from "../../src/mapper/user.mapper";
import { IUser } from "../../src/schemas/user.schemas";

describe("mapUserResponse", () => {
  it("should map user object to response with required fields", () => {
    //given
    const mockUser: IUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
      role: "user",
    };

    //when
    const result = mapUserResponse(mockUser, "mock.jwt.token");
    //then
    expect(result.name).toBe(mockUser.name);
    expect(result.email).toBe(mockUser.email);
    expect(result.role).toBe(mockUser.role);
    expect(result.token).toBe("mock.jwt.token");
  });

  it("should not include password in mapped response", () => {
    //given
    const mockUser: IUser = {
      name: "Test User",
      email: "test@example.com",
      password: "secretPassword",
      role: "user",
    };

    //when
    const result = mapUserResponse(mockUser, "mock.jwt.token");

    //then
    expect(result).not.toHaveProperty("password");
  });
});
