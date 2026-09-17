import express from "express";
import {carrierToMetaController} from "../controllers/carrierToMetaController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { subscriptionsMiddleware } from "../middlewares/subscriptionMiddleware.js";
let router = express.Router();

router.post("/",carrierToMetaController);

export default router;