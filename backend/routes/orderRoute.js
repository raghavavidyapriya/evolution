import express from "express"
import authMiddleware from "../middleware/auth.js"
import authAdminMiddleware from "../middleware/authAdmin.js";
import { placeOrder, verifyOrder, userOrder, listOrders, updateStatus } from "../controllers/orderControllers.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware,placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrder)

orderRouter.get("/admin/list", authAdminMiddleware, listOrders)
orderRouter.post("/admin/status", authAdminMiddleware, updateStatus)

export default orderRouter;