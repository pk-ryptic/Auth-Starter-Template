import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/https";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message
    }));
    res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    });
};

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
}

export const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    console.log(`PATH : ${req.path}`, error);

    if (req.path === "/auth/refresh") {
        clearAuthCookies(res);
    }

    if(error instanceof z.ZodError) {
        handleZodError(res, error);
        return;
    }

    if(error instanceof AppError){
        handleAppError(res, error);
        return;
    }

    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};