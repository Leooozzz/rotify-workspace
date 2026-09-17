import { RequestHandler } from "express";
import { z } from "zod";
import { makeSignInUseCase } from "../../../main/factories/signInUseCase.factory";
import { env } from "../../../config/env.config";

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
    const { user, token } = await signinUseCase.execute(parsed.data)

    res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture ?? null,
        created_at: user.created_at,
    })
}
