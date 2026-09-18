import { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../../../shared/errors/AppError";
import { makeCreateUseCase } from "../../../main/factories/makeCreateUseCase.factory";

const userBodySchema = z.object({
    name: z.string().trim().min(1, "name is required"),
    email: z.email("invalid email"),
    password: z.string().min(6, "password must have at least 6 characters"),
})

export const CreateUserController:RequestHandler = async (req,res) => {
    if (!req.auth) {
        throw new AppError("Unauthorized", 401);
    }

    const parsed = userBodySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "ValidationError",
            issues: parsed.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    const createUserUseCase = makeCreateUseCase();
    const { user } = await createUserUseCase.execute(req.auth, parsed.data);

    return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture ?? null,
        created_at: user.created_at,
    });
}
