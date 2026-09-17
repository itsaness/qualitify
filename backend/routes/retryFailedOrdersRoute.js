import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {subscriptionsMiddleware} from "../middlewares/subscriptionMiddleware.js";
import { failedOrdersController } from "../controllers/failedOrdersController.js";

let router = express.Router();

router.get("/",authMiddleware,subscriptionsMiddleware,failedOrdersController);
router.get("/:order_number",authMiddleware,subscriptionsMiddleware,failedOrdersController);


export default router;