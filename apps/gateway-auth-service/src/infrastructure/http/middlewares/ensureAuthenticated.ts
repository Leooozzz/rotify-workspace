import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeTokenProvider } from "../../../main/factories/tokenProvider.factory";
import { ACCESS_COOKIE } from "../cookies";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.[ACCESS_COOKIE];

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = await makeTokenProvider().validateToken(token);

  if (!payload) {
    throw new AppError("Unauthorized", 401);
  }

  req.auth = {
    userId: payload.sub,
    role: payload.role,
    companyId: payload.companyId,
    companyRole: payload.companyRole,
  };

  next();
};
