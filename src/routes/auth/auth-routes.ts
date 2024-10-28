import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { Router } from "express";
import verifyToken from "../../middlewares/verify-token";
import generateAccessToken from "../../middlewares/generate-access-token";
import jwt from "jsonwebtoken";
import generateRefreshToken from "../../middlewares/generate-refresh-token";
import {registerUserController} from "../../controllers/auth/auth-controller";

const authRouter: Router = Router();


authRouter.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    // Authenticate User

    const accessToken = generateAccessToken({name: username});
    const refreshToken = generateRefreshToken({name: username});

    res.json({ accessToken, refreshToken });
});

authRouter.post("/auth/token", async (req, res) => {
    const refreshToken = req.body?.token;
    if (!refreshToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const isBlacklisted = await prisma.blacklistToken.findUnique({
        where: {
            token: refreshToken
        },
        select: {
            token: true
        }
    })
    if (isBlacklisted) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            try {
                await prisma.blacklistToken.create({
                    data: {
                        token: refreshToken
                    }
                })
            } catch (e) {
                console.log(e);
            }
            prisma.$disconnect();
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        const accessToken = generateAccessToken({name: user?.name});
        prisma.$disconnect();
        res.json({ accessToken });
    });
})

// @ts-ignore
authRouter.post("/posts", verifyToken, (req, res) => {
    const userObj = req["user"];
    console.log(userObj);
    res.json({ message: `Posts created for user ${userObj.name}` });
});

authRouter.post("/auth/register", async (req, res) => {
    try {
        const user = await registerUserController(req, res);
        res.status(201).json({ id: user });
    } catch (e) {
        res.status(400).json({
            message: "Error creating user",
            rawError: e.toString()
        });
    }
});

authRouter.post("/auth/logout", async (req, res) => {
    const refreshToken = req.body?.token;
    await prisma.$connect();
    try {
        await prisma.blacklistToken.create({
            data: {
                token: refreshToken
            }
        })
    } catch (e) {
        console.log(e);
        res.status(201).json({ message: "Logout successful. Token already blacklisted" });
        return;
    }
    prisma.$disconnect();

    res.sendStatus(204);
});


export default authRouter;