import { RequestHandler } from "express";
import { z } from "zod";
import { makeSignUpUseCase } from "../../../main/factories/signUpUseCase.factory";

const signUpBodySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  email: z.email("invalid email"),
  password: z.string().min(6, "password must have at least 6 characters"),
  role: z.enum(["ADMIN", "USER"]).optional(),
  profile_picture: z.url().optional(),
});

export const signupController: RequestHandler = async (req, res) => {
  const parsed = signUpBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "ValidationError",
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const signUpUseCase = makeSignUpUseCase();
  const { user } = await signUpUseCase.execute(parsed.data);

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile_picture: user.profile_picture ?? null,
    created_at: user.created_at,
  });
};
