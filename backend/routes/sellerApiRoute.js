import express from "express";
import { getOrder } from "../controllers/sellerApiController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { subscriptionsMiddleware } from "../middlewares/subscriptionMiddleware.js";
let router = express.Router();

router.post("/",getOrder);

export default router;