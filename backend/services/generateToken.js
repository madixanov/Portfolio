import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "15min" }
    )

    const refreshToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    )

    return { accessToken, refreshToken };
}