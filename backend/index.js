import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import cors from "cors";
import SellerApiRoute from "./routes/sellerApiRoute.js";
import SellerDispatchRoute from "./routes/sellerDispatchRoute.js";
import carrierToMetaRoute from "./routes/carrierToMetaRoute.js";
import chargilyRoute from "./routes/chargilyRoute.js";
import plansRoute from "./routes/plansRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import yalidineWebhookRoute from "./routes/yalidineWebhookRoute.js";
import apiKeyRoute from "./routes/apiKeyRoute.js";
import credentialsRoute from "./routes/credentialsRoute.js";
import accessCredentialsRoute from "./routes/accessCredentialsRoute.js";
import ordersStatsRoute from "./routes/ordersStatsRoute.js";
import failedOrdersRoute from "./routes/failedOrdersRoute.js";
import retryFailedOrdersRoute from "./routes/retryFailedOrdersRoute.js";
import webhookTokenRoute from "./routes/webhookTokenRoute.js";
import maystroWebhookRoute from "./routes/maystroWebhookRoute.js";
import ayorWebhookRoute from "./routes/ayorWebhookRoute.js";
let app = express();
const originOptions = {
    origin:['http://localhost:3000','http://localhost:5173',"https://qualitify.app","https://www.qualitify.app"],
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true

}
app.use(cors(originOptions));
app.all("/api/auth/*splat",toNodeHandler(auth));
app.use("/api/payment",paymentRoute);
app.use("/api/webhook/yalidine",yalidineWebhookRoute);
app.use("/api/webhook/maystro",maystroWebhookRoute);
app.use(express.json());
app.use("/api/orders",SellerApiRoute);
app.use("/api/orders/:order_number/tracking",SellerDispatchRoute);
app.use("/api/tracking/update",carrierToMetaRoute);
app.use("/api/checkout",chargilyRoute);
app.use("/api/plans",plansRoute);
app.use("/api/key",apiKeyRoute);
app.use("/api/credentials",credentialsRoute);
app.use("/api/accessCredentials",accessCredentialsRoute);
app.use("/api/stats",ordersStatsRoute);
app.use("/api/failed",failedOrdersRoute);
app.use("/api/retry",retryFailedOrdersRoute);
app.use("/api/webhooktoken",webhookTokenRoute);
app.use("/api/ayor/webhook",webhookTokenRoute);















app.listen(3000,()=>{
    console.log("Server is running !");

})
