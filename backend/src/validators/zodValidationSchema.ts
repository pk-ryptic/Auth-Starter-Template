import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: `Passwords didn't match`,
        path: [`confirmPassword`]
    }
);

export const loginSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    userAgent: z.string().optional(),
})

export const verificationCodeSchema = z.string().min(1).max(24);

export const resetPasswordSchema = z.object({
    password: z.string().min(6).max(255),
    verificationCode: verificationCodeSchema,
});

export const emailSchema = z.string().email().min(1).max(255);