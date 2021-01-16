import jwt from "jsonwebtoken";

export const Role = {
  Admin: "ROLE_ADMIN",
  Reviewer: "ROLE_REVIEWER",
  Supervisor: "ROLE_SUPERVISOR"
};

export const AuthStatus = {
  Logged: "LOGGED",
  InvalidCredentials: "INVALID_CREDENTIALS",
  TokenExpired: "TOKEN_EXPIRED"
};

export function getUser(token) {
  let user = null;
  //decode JWT token
  if (token) {
    const decoded = jwt.decode(token, { complete: true });
    //console.log(decoded);
    user = decoded.payload;
    //console.log(user);
  }
  return user;
}

export function getRole(token) {
  return token ? getUser(token).auth[0] : "";
}
