import { CookieOptions, Response } from "express"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite:"strict",
    httpOnly: true,
    secure
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/auth/refresh"
})

interface CookieInputType {
    res: Response,
    accessToken: string,
    refreshToken: string
}

export const setAuthCookies = ({res, accessToken, refreshToken}: CookieInputType) => {
    return (res
            .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
            .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())
    );
};

export const clearAuthCookies = (res: Response) =>
    res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: "/auth/refresh",
    });