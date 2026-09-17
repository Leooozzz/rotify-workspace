import { RequestHandler } from "express";
import { REFRESH_COOKIE, clearAuthCookies } from "../cookies";
import { makeRefreshTokenProvider } from "../../../main/factories/refreshTokenProvider.factory";

export const singoutController: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE];

  if (refreshToken) {
    await makeRefreshTokenProvider().revoke(refreshToken);
  }

  clearAuthCookies(res);

  return res.status(204).send();
};
