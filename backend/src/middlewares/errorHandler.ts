import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/https";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {

    console.log(`PATH : ${req.path}`, error);
    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};