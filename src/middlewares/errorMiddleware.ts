import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/errors/apiErrors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).send({ message });
};
