import validator from "validator";

export const validateUserInput = (
  name: string,
  email: string,
  password: string
): string[] | null => {
  const errors: string[] = [];

  if (!name || validator.isEmpty(name.trim())) {
    errors.push("Name is required");
  }

  if (!email || !validator.isEmail(email)) {
    errors.push("A valid email is required");
  }

  if (!password || !validator.isLength(password, { min: 8 })) {
    errors.push("Password must be at least 8 characters");
  }

  return errors.length > 0 ? errors : null;
};
