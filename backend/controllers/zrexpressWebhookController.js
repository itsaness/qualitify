import pool from "../database/db.js";
import svix from "svix";
import { decryptApiKey } from "../services/apiKeyService.js";

let zrexpressWebhookController = async(req,res)=>{
    let payload = req.body;
    let headers = req.headers;
    let webhook_token=req.params.webhook_token
    try{
        let credentialsRes = await pool.query("SELECT encrypted_credentials FROM seller_integrations WHERE webhook_token=$1 AND provider_name='Zrexpress",[webhook_token]);
        if(credentialsRes.rows.length==0){
            return res.status(400).json("Seller credentials not found");
        }
        let jsonString = decryptApiKey(credentialsRes.rows[0].encrypted_credentials);
        let credentials = JSON.parse(jsonString);
        const wh = new svix.Webhook(credentials.endpointSecret);
        const verified = wh.verify(payload,{
            "svix-id":headers["svix-id"],
            "svix-timestamp":headers["svix-timestamp"],
            "svix-signature":headers["svix-signature"]
        });
        const event = JSON.parse(verified);
        let ordersRes = await pool.query("UPDATE orders SET status='completed' WHERE tracking_number=$1 AND status!='completed'")


    }catch(){

    }
}