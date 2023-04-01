import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import errors from "errors";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) errors.unauthorizedError();

  const parts = authorization?.split(" "); //["Bearer, <token>"]

  if (!parts) throw errors.unauthorizedError();
  if (parts.length !== 2) errors.unauthorizedError();

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET!, async (err, decoded) => {
    if (err) errors.unauthorizedError();

    const user = await findUserByIdService(decoded.id);

    if (!user) errors.unauthorizedError();

    res.locals.user = user;

    return next();
  });
}
