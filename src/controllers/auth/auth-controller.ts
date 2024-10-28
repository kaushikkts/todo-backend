import bcrypt from "bcrypt";
import {Request, Response} from "express";
import prisma from "../../db";
import {User} from "../../models/User";


const registerUserController = async (req: Request, res: Response) => {
    const user: User = req.body;
    // Check if user already exists
    const userExists = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Create user
    try {
        return prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user?.dateOfBirth,
                password: hashedPassword,
                Address: {
                    create: {
                        street: user?.address?.street,
                        city: user?.address?.city,
                        state: user?.address?.state,
                        zip: user?.address?.zip
                    }
                }
            },
            select: {
                id: true,
            }
        });
    } catch (e) {
        throw Error(e);
    } finally {
        prisma.$disconnect();
    }
};

const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // Check password
    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401).json({ message: "Oops! Looks like you have entered wrong password." });
        return;
    }
};

export {
    registerUserController
}