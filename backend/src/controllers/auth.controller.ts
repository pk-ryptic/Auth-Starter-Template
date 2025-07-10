import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/https";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = z.object({
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

export const registerHandler = catchErrors(
    async (req, res) => {
        
        // validate the request
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        });

        // call the service
        const { User, accessToken, refreshToken } = await createAccount(request);

        // return the response
        return (
            setAuthCookies({res, accessToken, refreshToken})
                .status(CREATED)
                .json(User)
        );
    }
);