import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeListUsersUseCase } from "../../../main/factories/listUsersUseCase.factory";

export const listUsersController: RequestHandler = async (req, res) => {
  if (!req.auth) {
    throw new AppError("Unauthorized", 401);
  }

  const listUsersUseCase = makeListUsersUseCase();
  const users = await listUsersUseCase.execute(req.auth);

  return res.status(200).json(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile_picture: user.profile_picture ?? null,
      created_at: user.created_at,
    })),
  );
};
