import { Types } from "mongoose";
import {
  isvalidateId,
  validateProductInput,
  validateProductUpdateInput,
} from "../../src/validator/product.validator";

describe("product.validator", () => {
  describe("isvalidateId", () => {
    it("should return false when id is a valid MongoDB ObjectId", () => {
      // Given
      const validId = new Types.ObjectId().toString();

      // When
      const result = isvalidateId(validId);

      // Then
      expect(result).toBe(false);
    });

    it("should return true when id is invalid", () => {
      // Given
      const invalidId = "invalid-id";

      // When
      const result = isvalidateId(invalidId);

      // Then
      expect(result).toBe(true);
    });

    it("should return true when id is not a string", () => {
      // Given
      const invalidId = 12345;

      // When
      const result = isvalidateId(invalidId);

      // Then
      expect(result).toBe(true);
    });
  });

  describe("validateProductInput", () => {
    it("should return null when product input is valid", () => {
      // Given
      const payload = {
        name: "AI Subscription",
        companyName: "OpenAI",
        price: 49.99,
        description: "Access to AI APIs",
        isActive: true,
      };

      // When
      const result = validateProductInput(
        payload.name,
        payload.companyName,
        payload.price,
        payload.description,
        payload.isActive,
      );

      // Then
      expect(result).toBeNull();
    });

    it("should return errors when required fields are invalid", () => {
      // Given
      const payload = {
        name: "",
        companyName: "",
        price: -10,
      };

      // When
      const result = validateProductInput(
        payload.name,
        payload.companyName,
        payload.price,
      );

      // Then
      expect(result).toEqual([
        "Product name is required",
        "Company name is required",
        "Price must be a positive number",
      ]);
    });
  });

  describe("validateProductUpdateInput", () => {
    it("should return null when update input is valid", () => {
      // Given
      const payload = {
        name: "Updated Product",
        companyName: "Google",
        price: 99.99,
        description: "Updated description",
        isActive: false,
      };

      // When
      const result = validateProductUpdateInput(
        payload.name,
        payload.companyName,
        payload.price,
        payload.description,
        payload.isActive,
      );

      // Then
      expect(result).toBeNull();
    });

    it("should return error when name is empty", () => {
      // Given
      const name = " ";

      // When
      const result = validateProductUpdateInput(name);

      // Then
      expect(result).toContain("Product name cannot be empty");
    });

    it("should return error when company name is empty", () => {
      // Given
      const companyName = "";

      // When
      const result = validateProductUpdateInput(undefined, companyName);

      // Then
      expect(result).toContain("Company name cannot be empty");
    });

    it("should return error when price is invalid", () => {
      // Given
      const invalidPrice = -50;

      // When
      const result = validateProductUpdateInput(
        undefined,
        undefined,
        invalidPrice,
      );

      // Then
      expect(result).toContain("Price must be a positive number");
    });
  });
});
