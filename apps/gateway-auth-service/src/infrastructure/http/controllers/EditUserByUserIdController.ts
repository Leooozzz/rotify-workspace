import { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../../shared/errors/AppError";
import { makeEditUserUseCase } from "../../../main/factories/makeEditUserUseCase.factory";

const editUserBodySchema = z
    .object({
        name: z.string().trim().min(1, "name is required").optional(),
        email: z.email("invalid email").optional(),
        password: z.string().min(6, "password must have at least 6 characters").optional(),
        profile_picture: z.string().optional(),
    })
    .refine((data) => Object.values(data).some((value) => value !== undefined), {
        message: "at least one field is required",
    });

export const EditUserByUserIdController: RequestHandler<{ userId: string }> = async (req, res) => {
    if (!req.auth) {
        throw new AppError("Unauthorized", 401);
    }

    const parsed = editUserBodySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "ValidationError",
            issues: parsed.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    const editUserUseCase = makeEditUserUseCase();
    const { user } = await editUserUseCase.execute(req.auth, req.params.userId, parsed.data);

    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture ?? null,
        created_at: user.created_at,
    });
}
