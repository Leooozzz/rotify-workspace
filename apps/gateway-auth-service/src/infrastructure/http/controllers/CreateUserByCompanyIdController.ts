import { RequestHandler } from "express";
import { AppError } from "../../../shared/errors/AppError";
import z from "zod";
import { makeCreateByCompanyIdUseCase } from "../../../main/factories/makeCreateByCompanyIdUseCase";

const userBodySchema = z.object({
    name: z.string().trim().min(1, "name is required"),
    email: z.email("invalid email"),
    password: z.string().min(6, "password must have at least 6 characters"),
})

export const CreateUserByCompanyIdController:RequestHandler = async (req,res) => {
    if(!req.auth){
        throw new AppError("Unauthorized", 401);
    }

    const rawCompanyId = req.params.companyId;
    const companyId = Array.isArray(rawCompanyId) ? rawCompanyId[0] : rawCompanyId;
    if (!companyId) {
        throw new AppError("companyId is required", 400);
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

    const createUserUseCase = makeCreateByCompanyIdUseCase();
    const { user } = await createUserUseCase.execute(req.auth, {
        ...parsed.data,
        companyId,
    });

    return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture ?? null,
        created_at: user.created_at,
    });
}