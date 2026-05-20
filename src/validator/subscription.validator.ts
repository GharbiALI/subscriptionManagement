import validator from "validator";

export const isvalidateId = (id: unknown): boolean => {
  return typeof id !== "string" || !validator.isMongoId(id);
};
