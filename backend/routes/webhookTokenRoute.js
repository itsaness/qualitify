import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {webhookTokenController} from "../controllers/webhookTokenController.js";
let router = express.Router();

router.post("/",authMiddleware,webhookTokenController);

export default router;