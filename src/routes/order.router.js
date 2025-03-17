import express from "express";
import { createOrder, deleteOrder, getOrders, getSingleOrder, processOrder } from "../controllers/order.controller.js";


const orderRouter = express.Router();

orderRouter.route("/orders").post(createOrder).get(getOrders)
orderRouter.route("/process-next-order").post(processOrder)
orderRouter.route("/orders/:id").get(getSingleOrder).delete(deleteOrder)

export default orderRouter