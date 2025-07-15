import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/https";
import AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

/**
Assets a condition and throws an AppError if the condition is falsy .
**/

const appAssert: AppAssert = (
    condition, 
    httpStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;