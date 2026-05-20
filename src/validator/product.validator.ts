import validator from "validator";

export const validateProductInput = (
  name: unknown,
  companyName: unknown,
  price: unknown,
  description?: unknown,
  isActive?: unknown,
): string[] | null => {
  const errors: string[] = [];
  const parsedName = typeof name === "string" ? name.trim() : "";
  const parsedCompanyName =
    typeof companyName === "string" ? companyName.trim() : "";
  const parsedPrice = Number(price);

  if (!parsedName || validator.isEmpty(parsedName)) {
    errors.push("Product name is required");
  }

  if (!parsedCompanyName || validator.isEmpty(parsedCompanyName)) {
    errors.push("Company name is required");
  }

  if (
    price === undefined ||
    price === null ||
    Number.isNaN(parsedPrice) ||
    parsedPrice <= 0
  ) {
    errors.push("Price must be a positive number");
  }

  if (description !== undefined && description !== null) {
    const parsedDescription = String(description).trim();
    if (validator.isEmpty(parsedDescription)) {
      errors.push("Description cannot be empty");
    }
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  return errors.length > 0 ? errors : null;
};
