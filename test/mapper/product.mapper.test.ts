import {
  mapProductResponse,
  ProductResponse,
} from "../../src/mapper/product.mapper";
import { IProduct } from "../../src/schemas/product.schemas";

describe("mapProductResponse", () => {
  it("should map product object to response with required fields", () => {
    // given
    const mockProduct: IProduct = {
      name: "AI Model Subscription",
      companyName: "Chat GPT",
      price: 49.99,
      description: "Access to generative AI model endpoints",
      isActive: true,
    };

    // when
    const result = mapProductResponse(mockProduct);

    // then
    expect(result).toEqual<ProductResponse>({
      name: "AI Model Subscription",
      companyName: "Chat GPT",
      price: 49.99,
      description: "Access to generative AI model endpoints",
      isActive: true,
    });
  });

  it("should not add any extra fields to the mapped response", () => {
    // given
    const mockProduct: IProduct = {
      name: "AI Analytics API",
      companyName: "Bard",
      price: 79.99,
      isActive: true,
    };

    // when
    const result = mapProductResponse(mockProduct);

    // then
    expect(result).not.toHaveProperty("_id");
    expect(result).not.toHaveProperty("password");
  });
});
