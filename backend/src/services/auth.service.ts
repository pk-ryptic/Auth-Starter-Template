import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { VerificationCodeType } from "../constants/verificationCodeTypes";
import { SessionModel } from "../models/session.model";
import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
    // verifying that jo user hai vo already exist nhi karta hoo
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    if (existingUser) {
        throw new Error("User Already Exist")
    }

    // create user 
    const User = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: User._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    });

    // create a verifiction email

    // create session
    const session = await SessionModel.create({
        userId: User._id,
        userAgent: data.userAgent,
    })

    // sign access and refresh tokens 
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,
        { audience: ['user'], expiresIn: '30d' }
    )
    
    const accessToken = jwt.sign(
        { userId: User._id, sessionId: session._id },
        JWT_SECRET,
        { audience: ['user'], expiresIn: '15m' }
    )

    // return user and tokens
    return { User, accessToken, refreshToken };
};