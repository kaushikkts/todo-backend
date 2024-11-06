import bcrypt from "bcrypt";
import prisma from "../../db";
import { User } from "../../models/User";

const registerUserController = async (user: User) => {
  // Check if user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  if (userExists) {
    throw new Error("User already exists");
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
        password: hashedPassword,
        Address: {
          create: {
            line1: user?.address?.line1,
            city: user?.address?.city,
            state: user?.address?.state,
            zip: user?.address?.zip,
          },
        },
      },
      select: {
        id: true,
      },
    });
  } catch (e) {
    throw Error(e);
  }
};

const loginUserController = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // Check password
  let passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Oops! Looks like you have entered wrong password.");
  }
  return user.id;
};

export { registerUserController, loginUserController };
