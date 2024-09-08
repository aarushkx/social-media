import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRY + "d",
    });
    return res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: process.env.JWT_TOKEN_EXPIRY * 24 * 60 * 60 * 1000,
    });
};
