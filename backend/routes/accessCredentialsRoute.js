import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {accessCredentialsController} from "../controllers/accessCredentialsController.js";
let router = express.Router();

router.get("/:provider",authMiddleware,accessCredentialsController);

export default router;