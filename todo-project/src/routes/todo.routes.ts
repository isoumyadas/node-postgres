import { Router } from "express";
const router = Router();

import {
  createTodo,
  updateTodo,
  getAllTodos,
  showAllTodos,
} from "../controllers/todo.controller";

router.route("/createTodo").post(createTodo);
router.route("/updateTodo").patch(updateTodo);
router.route("/getTodos").get(getAllTodos);
router.route("/getAllTodos").get(showAllTodos);

export default router;
