import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeGetProfileUseCase } from "../../../main/factories/getProfileUseCase.factory";

export const meController: RequestHandler = async (req, res) => {
  if (!req.auth) {
    throw new AppError("Unauthorized", 401);
  }

  const getProfileUseCase = makeGetProfileUseCase();
  const { user, company } = await getProfileUseCase.execute(req.auth.userId);

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile_picture: user.profile_picture ?? null,
    created_at: user.created_at,
    company,
  });
};
