import { RequestHandler } from "express";
import { z } from "zod";
import { makeSignInUseCase } from "../../../main/factories/signInUseCase.factory";
import { setAuthCookies } from "../cookies";

const signinSchema = z.object({
    email: z.email("invalid email"),
    password: z.string().min(6, "password must have at least 6 characters"),
})

export const signinController:RequestHandler = async (req, res) => {
    const parsed = signinSchema.safeParse(req.body);
     if (!parsed.success) {
        return res.status(400).json({
        error: "ValidationError",
        issues: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        })),
        });
    }

    const signinUseCase = makeSignInUseCase()
    const { user, accessToken, refreshToken } = await signinUseCase.execute(parsed.data)

    setAuthCookies(res, accessToken, refreshToken)

    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture ?? null,
        created_at: user.created_at,
    })
}
