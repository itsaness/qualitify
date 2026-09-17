import express from "express";
import { maystroWebhookController } from "../controllers/maystroWebhookController.js";

let router = express.Router();

router.post("/:webhook_token",maystroWebhookController);

export default router;