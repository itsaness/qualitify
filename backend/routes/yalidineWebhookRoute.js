import express from "express";
import { yalidineWebhookController } from "../controllers/yalidineWebhookController.js";
let router = express.Router();

router.post("/:webhook_token",express.raw({type:"application/json"}),yalidineWebhookController);

export default router;
