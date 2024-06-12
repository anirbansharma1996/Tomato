import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
