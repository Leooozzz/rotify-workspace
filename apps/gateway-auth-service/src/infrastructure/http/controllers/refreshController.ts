import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeRefreshTokenUseCase } from "../../../main/factories/refreshTokenUseCase.factory";
import { REFRESH_COOKIE, setAuthCookies } from "../cookies";

export const refreshController: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE];

  if (!refreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  const refreshTokenUseCase = makeRefreshTokenUseCase();
  const { accessToken, refreshToken: newRefreshToken } =
    await refreshTokenUseCase.execute(refreshToken);

  setAuthCookies(res, accessToken, newRefreshToken);

  return res.status(204).send();
};
