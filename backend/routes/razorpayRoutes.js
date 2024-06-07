import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  paymentVerification,
  listOrders,
  userOrders,
  updateStatus
} from "../controllers/razorpayController.js";

const RazorpayRouter = express.Router();

RazorpayRouter.post("/place", authMiddleware, placeOrder);
RazorpayRouter.post("/verify", paymentVerification);
RazorpayRouter.post("/userorders",authMiddleware,userOrders)
RazorpayRouter.get("/list",listOrders)
RazorpayRouter.post("/status",updateStatus)

export default RazorpayRouter;
