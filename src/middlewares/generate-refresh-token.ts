import jwt from "jsonwebtoken";

export default function generateRefreshToken(user: { name: string }) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}