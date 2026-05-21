import {
  validateUserInput,
  validateUserLogin,
} from "../../src/validator/user.validator";

describe("User Validator", () => {
  describe("validateUserInput", () => {
    it("should return null when all inputs are valid", () => {
      //given
      const name = "John Doe";
      const email = "john@example.com";
      const password = "password123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toBeNull();
    });

    it("should return error when name is empty", () => {
      //given
      const name = "";
      const email = "john@example.com";
      const password = "password123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("Name is required");
    });

    it("should return error when name is only whitespace", () => {
      //given
      const name = "   ";
      const email = "john@example.com";
      const password = "password123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("Name is required");
    });

    it("should return error when email is invalid", () => {
      //given
      const name = "John Doe";
      const email = "invalid-email";
      const password = "password123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("A valid email is required");
    });

    it("should return error when email is empty", () => {
      //given
      const name = "John Doe";
      const email = "";
      const password = "password123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("A valid email is required");
    });

    it("should return error when password is too short", () => {
      //given
      const name = "John Doe";
      const email = "john@example.com";
      const password = "pass123";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("Password must be at least 8 characters");
    });

    it("should return error when password is empty", () => {
      //given
      const name = "John Doe";
      const email = "john@example.com";
      const password = "";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("Password must be at least 8 characters");
    });

    it("should return multiple errors when multiple fields are invalid", () => {
      //given
      const name = "";
      const email = "invalid-email";
      const password = "short";

      //when
      const result = validateUserInput(name, email, password);

      //then
      expect(result).toContain("Name is required");
      expect(result).toContain("A valid email is required");
      expect(result).toContain("Password must be at least 8 characters");
    });
  });
  describe("validateUserLogin", () => {
    it("should return null when login input is valid", () => {
      //given
      const email = "john@example.com";
      const password = "password123";

      //when
      const result = validateUserLogin(email, password);

      //then
      expect(result).toBeNull();
    });

    it("should return error when email is invalid", () => {
      //given
      const email = "invalid-email";
      const password = "password123";

      //when
      const result = validateUserLogin(email, password);

      //then
      expect(result).toContain("A valid email is required");
    });

    it("should return error when password is too short", () => {
      //given
      const email = "john@example.com";
      const password = "short";

      //when
      const result = validateUserLogin(email, password);

      //then
      expect(result).toContain("Password must be at least 8 characters");
    });

    it("should return multiple errors when both login fields are invalid", () => {
      //given
      const email = "invalid-email";
      const password = "short";

      //when
      const result = validateUserLogin(email, password);

      //then
      expect(result).toContain("A valid email is required");
      expect(result).toContain("Password must be at least 8 characters");
    });
  });
});
