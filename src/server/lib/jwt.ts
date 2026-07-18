import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

export interface TokenPayload {
  professorId: string;
  email: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
