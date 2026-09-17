import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeGetProfileUseCase } from "../../../main/factories/getProfileUseCase.factory";

export const meController: RequestHandler = async (req, res) => {
  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  const getProfileUseCase = makeGetProfileUseCase();
  const user = await getProfileUseCase.execute(req.userId);

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile_picture: user.profile_picture ?? null,
    created_at: user.created_at,
  });
};
