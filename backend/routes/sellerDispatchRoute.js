import express from "express";
let router = express.Router();
import { getTracking } from "../controllers/sellerDispatchController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { subscriptionsMiddleware } from "../middlewares/subscriptionMiddleware.js";

router.post("/",getTracking);

export default router;