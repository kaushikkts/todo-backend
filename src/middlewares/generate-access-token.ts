import jwt from "jsonwebtoken";

export default function generateAccessToken(user: { name: string }) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}