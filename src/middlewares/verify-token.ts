import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" })
        }
        req["user"] = user;
        next();
    });
};