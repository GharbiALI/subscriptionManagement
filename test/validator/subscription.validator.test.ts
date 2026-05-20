import { isvalidateId } from "../../src/validator/subscription.validator";

describe("isvalidateId Unit Tests", () => {
  
  describe("Valid MongoDB ObjectIds", () => {
    it("should return false for a valid 24-character hex string", () => {
      //given
      const validMongoId = "507f1f77bcf86cd799439011";

      //when
      const result = isvalidateId(validMongoId);

      //then
      expect(result).toBe(false);
    });
  });

  describe("Invalid MongoDB ObjectIds (Strings)", () => {
    it("should return true for a string that is too short", () => {
      //given
      const shortId = "12345";

      //when
      const result = isvalidateId(shortId);

      //then
      expect(result).toBe(true);
    });

    it("should return true for an empty string", () => {
      //given
      const emptyId = "";

      //when
      const result = isvalidateId(emptyId);

      //then
      expect(result).toBe(true);
    });

    it("should return true for a 24-character string with non-hex characters", () => {
      //given
      const invalidHexId = "507f1f77bcf86cd79943901z"; // 'z' is not a valid hex character

      //when
      const result = isvalidateId(invalidHexId);

      //then
      expect(result).toBe(true);
    });
  });

  describe("Non-String Data Types", () => {
    it("should return true when passed a number", () => {
      //given
      const numberId = 123456789012345678901234;

      //when
      const result = isvalidateId(numberId);

      //then
      expect(result).toBe(true);
    });

    it("should return true when passed null", () => {
      //given
      const nullId = null;

      //when
      const result = isvalidateId(nullId);

      //then
      expect(result).toBe(true);
    });

    it("should return true when passed undefined", () => {
      //given
      const undefinedId = undefined;

      //when
      const result = isvalidateId(undefinedId);

      //then
      expect(result).toBe(true);
    });

    it("should return true when passed an object", () => {
      //given
      const objectId = { id: "507f1f77bcf86cd799439011" };

      //when
      const result = isvalidateId(objectId);

      //then
      expect(result).toBe(true);
    });
  });
});