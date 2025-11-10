import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client";
import { NextFunction, Request, Response } from "express";
const prisma = new PrismaClient();

// This is a common practice in TypeScript with Express.
// It modifies the base Request type to include your custom 'user' property.
declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        email: string;
        username: string;
      };
    }
  }
}

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.jwtToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    console.log("TOken:: ", token);

    if (!token)
      return res.status(401).json({ message: "Unauthorized Request" });

    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN!
    );

    // if (
    //   typeof decodedToken === "object" &&
    //   decodedToken !== null &&
    //   "email" in decodedToken
    // ) {
    const userData = await prisma.user.findFirst({
      where: { email: (decodedToken as JwtPayload)?.email },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });

    if (!userData) return res.status(401).json("Invalid jwt token");

    req.user = userData;
    next();
    // }
  } catch (error) {
    throw new Error("Invlaid access token");
  }
};
