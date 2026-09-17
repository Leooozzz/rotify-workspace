import { RequestHandler } from "express";
import { env } from "../../../config/env.config";

export const singoutController: RequestHandler = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(204).send();
};
