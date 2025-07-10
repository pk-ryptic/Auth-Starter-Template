import { VerificationCodeType } from "../constants/verificationCodeTypes";
import { UserModel } from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";

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
    // sign access and refresh tokens 
    // return user and tokens
};