import { NextFunction, Request, Response } from "express";
import { ConflictError } from "helpers/errors/apiErrors";

export function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail: any) => detail.message);
      throw new ConflictError(errors);
    }

    next();
  };
}
