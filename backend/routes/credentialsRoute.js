import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { credentialsController } from "../controllers/credentialsController.js";
let router = express.Router();

router.post("/",authMiddleware,credentialsController);

export default router;