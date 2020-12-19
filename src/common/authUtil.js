import jwt from "jsonwebtoken";

export const AuthStatus = {
  Logged: "LOGGED",
  InvalidCredentials: "INVALID_CREDENTIALS",
  TokenExpired: "TOKEN_EXPIRED"
};

export function getUser(token) {
  //decode JWT token
  const decoded = jwt.decode(token, { complete: true });
  console.log(decoded);
  const user = decoded.payload;
  console.log(user);
  return user;
}
