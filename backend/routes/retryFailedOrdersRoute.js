import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {subscriptionsMiddleware} from "../middlewares/subscriptionMiddleware.js";
import { retryFailedOrdersController } from "../controllers/retryFailedOrdersController.js";

let router = express.Router();

router.get("/",authMiddleware,subscriptionsMiddleware,retryFailedOrdersController);
router.get("/:order_number",authMiddleware,subscriptionsMiddleware,retryFailedOrdersController);


export default router;