import express from "express";
import { ayorWebhookController } from "../controllers/ayorWebhookController.js";

let router = express.Router();

router.post("/:webhook_token",ayorWebhookController);

export default router;