import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {subscriptionsMiddleware} from "../middlewares/subscriptionMiddleware.js";
import { ordersStatsController } from "../controllers/ordersStatsController.js";

let router = express.Router();

router.get("/",authMiddleware,ordersStatsController);

export default router;