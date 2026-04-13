import db from "../db/db";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";
import { access } from "node:fs";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const exists = await db.user.get({
        where: { email: email },
    });

    if (exists) {
        res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            email: email,
            password: hashedPassword,
        }
    })

    return res.status(201).json({ message: "User created successfully", user: user });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.user.get({
        where: { email: email },
    })

    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const tokens = generateToken(user);

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.PRODUCTION,
        sameSite: "strict"}
    )

    return res.status(200).json({ message: "Login successful", user: {userId: user.id, email: user.email}, token: tokens.accessToken });
}

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: "15min" }
        );
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}