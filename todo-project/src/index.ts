import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";
const app = express();

// This expect json file and limit of 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// any kind of url encoded with the particular limit
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//  is used to serve static files (like CSS, images, JS) from a folder
app.use(express.static("public"));

app.use(cookieParser());

// TODO: Router

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

// =============================== PORT ========================================================
app.listen(process.env.PORT || 6000, () => {
  console.log(
    `Server is running at port: ${process.env.PORT ? process.env.PORT : 6000}`
  );
});
