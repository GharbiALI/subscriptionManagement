import validator from "validator";

export const validateUserInput = (
  name: string,
  email: string,
  password: string,
): string[] | null => {
  const errors: string[] = [];

  if (!name || validator.isEmpty(name.trim())) {
    errors.push("Name is required");
  }

  if (!email || !validator.isEmail(email)) {
    errors.push("A valid email is required");
  }

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 12,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push(
      "Password must be at least 12 characters and include uppercase, lowercase, number and symbol",
    );
  }

  return errors.length > 0 ? errors : null;
};

export const validateUserLogin = (
  email: string,
  password: string,
): string[] | null => {
  const errors: string[] = [];

  if (!email || !validator.isEmail(email)) {
    errors.push("A valid email is required");
  }

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 12,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push(
      "Password must be at least 12 characters and include uppercase, lowercase, number and symbol",
    );
  }

  return errors.length > 0 ? errors : null;
};
