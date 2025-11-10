import { Router } from "express";
const router = Router();
import {
  createTodo,
  updateTodo,
  getAllTodos,
  showAllTodos,
} from "../controllers/todo.controller";
import { verifyJwt } from "../middlewares/auth.middleware";

router.route("/createTodo").post(verifyJwt, createTodo);
router.route("/updateTodo").patch(verifyJwt, updateTodo);
router.route("/getTodos").get(verifyJwt, getAllTodos);
router.route("/getAllTodos").get(verifyJwt, showAllTodos);

export default router;
