import express, { Request, Response } from "express";

// import * as dotenv from "dotenv";
// dotenv.config();

import { PrismaClient, Prisma } from "../generated/prisma/client";
const prisma = new PrismaClient();

// Todo: todo Controller

const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, done, description } = req.body;

    if ([title, description].some((field) => field.trim() === "")) {
      throw new Error("All fields are required!");
    }

    const data = await prisma.todo.create({
      data: {
        title,
        done,
        description,
        userId: req.user?.id!,
      },
    });

    console.log("Todo Created Successfully: ", data);

    return res.status(201).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title, done, description, id } = req.body;

    const data = await prisma.todo.update({
      where: { id },
      data: {
        title,
        done,
        description,
      },
    });

    console.log("Todo Updated Successfully: ", data);

    return res.status(200).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.body;

    const data = await prisma.todo.findMany({
      where: { userId: req.user?.id! },
      select: {
        title: true,
        description: true,
        done: true,
        id: true,
      },
    });

    console.log("Todos: ", data);

    return res.status(200).json({ userId: req.user?.id, todos: data });
  } catch (error: any) {
    throw new Error(error);
  }
};

const showAllTodos = async (req: Request, res: Response) => {
  try {
    const data = await prisma.todo.findMany();

    console.log("All Todos: ", data);

    return res.status(200).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createTodo, updateTodo, getAllTodos, showAllTodos };
