import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 8);
}

export function doesPasswordsMatch(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
