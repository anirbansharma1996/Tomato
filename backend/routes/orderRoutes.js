import express from "express"
import authMiddleware from "../middleware/auth.js"
import {listOrders, placeOrder, userOrders, verifyOrder,updateStatus} from "../controllers/orderController.js"

const OrderRouter = express.Router()

OrderRouter.post("/place",authMiddleware,placeOrder)
OrderRouter.post("/verify",verifyOrder)
OrderRouter.post("/userorders",authMiddleware,userOrders)
OrderRouter.get("/list",listOrders)
OrderRouter.post("/status",updateStatus)

export default OrderRouter