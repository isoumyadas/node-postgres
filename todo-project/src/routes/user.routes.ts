import { Router } from "express";
const router = Router();

import {
  createUserAccount,
  loginCurrentUser,
} from "../controllers/user.controller";

router.route("/create").post(createUserAccount);
router.route("/login").post(loginCurrentUser);

export default router;
