import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { FindByIdUserService } from "@/modules/Users/useCases/findUserById/findByIdUserService";
import { NotFoundError, UnauthorizedError } from "@/helpers/errors/apiErrors";

interface ITokenPayload extends JwtPayload {
  id: string;
}

class AuthMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError("Invalid token!");
    const secret = process.env.SECRET as string;

    const parts = authorization?.split(" ");
    if (!parts) throw new UnauthorizedError("Invalid token!");
    if (parts.length !== 2) throw new UnauthorizedError("Invalid token!");

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema))
      throw new UnauthorizedError("Invalid token!");

    jwt.verify(token, secret, async (err, decoded) => {
      try {
        if (err) {
          res.locals.token = token;
          return next();
        }
        if (!decoded) throw new UnauthorizedError("Invalid token!");

        const { id } = decoded as ITokenPayload;
        const findByIdUserService = container.resolve(FindByIdUserService);
        const user = await findByIdUserService.execute(id);

        if (!user) throw new NotFoundError("User not found!");

        res.locals.user = user;
        return next();
      } catch (err: any) {
        return next(err);
      }
    });
  }
}

export default new AuthMiddleware();
