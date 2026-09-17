import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeListUsersByCompanyIdUseCase } from "../../../main/factories/listUsersByCompanyIdUseCase.factory";

export const listUserByCompanyIdController: RequestHandler<{ companyId: string }> = async (req, res) => {
  if (!req.auth) {
    throw new AppError("Unauthorized", 401);
  }

  const { companyId } = req.params;

  const listUsersByCompanyIdUseCase = makeListUsersByCompanyIdUseCase();
  const users = await listUsersByCompanyIdUseCase.execute(req.auth, companyId);

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