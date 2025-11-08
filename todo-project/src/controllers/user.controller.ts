import express, { Request, Response } from "express";

import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

// import * as dotenv from "dotenv";
// dotenv.config();

// TODO: User controller

const createUserAccount = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if ([email, password, username].some((fiedl) => fiedl.trim() === "")) {
      throw new Error("All fields are required!");
    }

    const data = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    console.log("User Created Successfully", data);

    return res.status(201).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

const loginCurrentUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((fiedl) => fiedl.trim() === "")) {
      throw new Error("All fields are required!");
    }

    // Need to check password...

    const data = await prisma.user.findFirst({
      where: { email },
    });

    if (!data) return res.json("Please Create your account");

    console.log("LoggedIn Successfully: ", data);

    return res.status(200).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createUserAccount, loginCurrentUser };
