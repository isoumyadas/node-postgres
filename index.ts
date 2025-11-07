// require('dotenv').config()
import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "./generated/prisma/client";

// import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Insert users
async function insertUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email,
      password,
      firstname: firstName,
      lastname: lastName,
    },
  });

  console.log(res);
}

insertUser("soumya@test1.com", "123", "sam", "zimmy");

// interface UpdateParams {
//   firstName: string;
//   lastName: string;
// }

// async function updateUser(
//   username: string,
//   { firstName, lastName }: UpdateParams
// ) {
//   const res = await prisma.user.update({
//     where: { email: username },
//     data: {
//       firstname: firstName,
//       lastname: lastName,
//     },
//   });

//   console.log(res);
// }

// updateUser("soumya@test1.com", { firstName: "SoumyaRanjan", lastName: "Das" });

async function getUser(username: string) {
  const res = await prisma.user.findFirst({ where: { email: username } });
  console.log(res);
}

getUser("soumya@test1.com");
