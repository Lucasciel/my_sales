
import AppError from "@modules/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddlewere {
  static execute(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);

      const {sub} = decodedToken as ITokenPayload;

      request.user = {
        id: sub
      };

      return next();

    } catch (error) {
      throw new AppError("Invalid token", 401);
    }
  }
}
