import bcrypt from "bcrypt";

export const createPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const checkPassword = async (entered: string, original: string) => {
  const isValid = await bcrypt.compare(entered, original);
  return isValid;
};
