import crypto from "crypto";
import pool from "../database/db.js";
import { metaCapi } from "../services/metaService.js";
import { decryptApiKey } from "../services/apiKeyService.js";
import { getSellerById } from "../services/sellerApiService.js";


export async function yalidineWebhookController(req,res){
    let webhook_token = req.params.webhook_token;

    try{
        let sellerRes = await pool.query("SELECT seller_id FROM seller_integrations WHERE webhook_token=$1",[webhook_token]);
        let seller = getSellerById(sellerRes.rows[0].id);
        if(!seller){
            return res.status(200).json({message:"Seller profile not found"});
        }
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>new Date(seller.current_period_end)){
            return res.status(200).json({message:"You don't have an active subscription."});
        }
        let seller_id = seller.id;
         let credentialsRes = await pool.query("SELECT encrypted_credentials FROM seller_integrations WHERE provider_name=$1 AND seller_id=$2",['Yalidine',seller_id]);
         if(credentialsRes.rows.length==0){
        return res.status(200).json({success:false,error:"Yalidine credentials not found"})
    }
    let encryptedCredentials = decryptApiKey(credentialsRes.rows[0].encrypted_credentials)
    let credentials = JSON.parse(encryptedCredentials);
        let decryptedWebhookSecret = credentials.webhook_secret;
        const signature = req.headers["x-yalidine-signature"];
        const computedSignature = crypto.createHmac("sha256",decryptedWebhookSecret).update(req.body).digest("hex");
        if(computedSignature !== signature){
            return res.status(400).json({message:"Invalid signature !"});
        }
        const payload = JSON.parse(req.body.toString("utf8"));
        const{type,events}=payload;
        for(const event of events){
            const tracking_number = event.data?.tracking;
            const status = event.data?.status;
            if(!tracking_number||status != "Livré") continue;
            const result = await pool.query("UPDATE orders SET status='completed' WHERE tracking_number=$1 AND status!='completed' RETURNING *",[tracking_number]);
            const order = result.rows[0];
            if(!order)
                continue;
            await metaCapi(order);

        }
         return res.status(200).json({received:true});
        }catch(err){
            
return res.status(500).json({message:"Internal server error"});


    }

}