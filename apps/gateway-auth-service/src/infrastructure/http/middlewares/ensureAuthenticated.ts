import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeTokenProvider } from "../../../main/factories/tokenProvider.factory";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const userId = await makeTokenProvider().validateToken(token);

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  req.userId = userId;
  next();
};
