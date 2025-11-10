import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

// TODO: User controller

const createUserAccount = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if ([email, password, username].some((fiedl) => fiedl.trim() === "")) {
      throw new Error("All fields are required!");
    }

    const existedUser = await prisma.user.findFirst({
      where: { email },
    });

    console.log("existedUser:: ", existedUser);

    if (existedUser) return "Email already exist! try another one or login ";

    // password hashing
    const hashedPass = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPass,
        username,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    console.log("User Created Successfully, Please Login", data);

    return res
      .status(201)
      .json({ message: "User Created Successfully, Please Login", data });
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

    const data = await prisma.user.findFirst({
      where: { email },
    });

    if (!data) return res.json("Please Create your account");

    const comparingPass = bcrypt.compare(password, data.password);

    if (!comparingPass)
      return res
        .status(400)
        .json("Your Password is incorrect! Please recheck.");

    // Creating jwt token

    const generatedJwtToken = jwt.sign(
      {
        id: data.id,
        email: data.email,
        username: data.username,
      },
      process.env.JWT_SECRET_TOKEN!,
      { expiresIn: "1h" }
    );

    console.log("LoggedIn Successfully: ", data);

    return res
      .status(200)
      .cookie("jwtToken", generatedJwtToken, { httpOnly: true, secure: true })
      .json({ user: data, generatedJwtToken });
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createUserAccount, loginCurrentUser };
