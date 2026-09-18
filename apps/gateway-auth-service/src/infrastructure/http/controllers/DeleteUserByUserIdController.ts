import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { makeDeleteUserUseCase } from "../../../main/factories/makeDeleteUserUseCase.factory";

export const DeleteUserByUserIdController: RequestHandler<{ userId: string }> = async (req, res) => {
    if (!req.auth) {
        throw new AppError("Unauthorized", 401);
    }

    const deleteUserUseCase = makeDeleteUserUseCase();
    await deleteUserUseCase.execute(req.auth, req.params.userId);

    return res.status(204).send();
}
