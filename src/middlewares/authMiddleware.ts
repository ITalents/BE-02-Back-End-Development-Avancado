import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { FindByIdUserService } from "../modules/Users/useCases/findUserById/findByIdUserService";
import { NotFoundError, UnauthorizedError } from "helpers/errors/apiErrors";

interface ITokenPayload extends JwtPayload {
  id: string;
}

class AuthMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Response {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).send({ message: "Invalid token!" });
    const secret = process.env.SECRET as string;

    const parts = authorization?.split(" ");
    if (!parts) throw new UnauthorizedError("Invalid token!");
    if (parts.length !== 2)
      return res.status(401).send({ message: "Invalid token!" });

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema))
      return res.status(401).send({ message: "Invalid token!" });

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) return res.status(401).send({ message: "Invalid token!" });
      if (!decoded) return res.status(401).send({ message: "Invalid token!" });

      const { id } = decoded as ITokenPayload;

      try {
        const findByIdUserService = container.resolve(FindByIdUserService);
        const user = await findByIdUserService.execute(id);

        if (!user) return res.status(404).send({ message: "User not found!" });

        res.locals.user = user;
        return next();
      } catch (err: any) {
        return res.status(500).send(err.message);
      }
    });
  }
}

export default new AuthMiddleware();
