import * as userRepository from "../../src/repository/user.repository";
import { registerUser, getUserByEmail } from "../../src/services/user.services";

jest.mock("../../src/repository/user.repository");

describe("user.services", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should call createUser once when registering", async () => {
    //given
    (userRepository.createUser as jest.Mock).mockResolvedValue({
      name: "Alice",
      email: "alice@example.com",
      password: "hashed",
      role: "user",
    });
    //when
    await registerUser("Alice", "alice@example.com", "password123");
    //then
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });


  it("should return the user that createUser returns", async () => {
    //given
    const fakeUser = {
      name: "Alice",
      email: "alice@example.com",
      password: "hashed",
      role: "user" as const,
    };

    (userRepository.createUser as jest.Mock).mockResolvedValue(fakeUser);
    //when
    const result = await registerUser("Alice", "alice@example.com", "password123");
    //then
    expect(result).toEqual(fakeUser);
  });


  it("should return null when user is not found", async () => {
    //given
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
    //when
    const result = await getUserByEmail("nobody@example.com");
    //then
    expect(result).toBeNull();
  });

  it("should return the user when found", async () => {
    //given
    const fakeUser = {
      name: "Alice",
      email: "alice@example.com",
      password: "hashed",
      role: "user" as const,
    };
    //when
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(fakeUser);

    const result = await getUserByEmail("alice@example.com");
    //then
    expect(result).toEqual(fakeUser);
  });

});