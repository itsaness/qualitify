import express from "express";
import { apiKeyController } from "../controllers/apiKeyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
let router = express.Router();

router.post("/",authMiddleware,apiKeyController);

export default router;
