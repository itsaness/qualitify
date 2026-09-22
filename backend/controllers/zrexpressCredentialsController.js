import pool from "../database/db.js";
import { encryptApiKey,decryptApiKey } from "../services/apiKeyService.js";
import crypto from "crypto";
import "dotenv/config";

let getOrCreateWebhookToken=async (sellerId)=>{
    try{
        let existing = await pool.query("SELECT webhook_token WHERE seller_id=$1 AND provider_name=$2",[sellerId,"Zrexpress"]);
        if(existing.rows.length>0 && existing.rows[0].webhook_token){
            return existing.rows[0].webhook_token
        }
        let webhook_token = crypto.randomBytes(16).toString("hex");
        return webhook_token;
    }catch(err){
        throw new Error("Couldn't get webhook token");
    }



}

let zrexpressCredentialsController = async(req,res)=>{
    let userId = req.user.id;
    const{accessToken,tenantId}=req.body;
    try{
        let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
        if(sellerRes.rows.length==0){
            res.status(400).json({message:"Seller profile not found"});
        }
        let sellerId = sellerRes.rows[0].id;
        let webhook_token = await getOrCreateWebhookToken();
        const existing = await pool.query("SELECT encrypted_credentials FROM seller_integrations WHERE seller_id=$1 AND provider_name=$2",[sellerId,'Zrexpress']);
        if(existing.rows.length>0 && existing.rows[0].encrypted_credentials){
            try{
                const old = JSON.parse(decryptApiKey(existing.rows[0].encrypted_credentials));
                if(old.endpointId){
                    await fetch(`https://api.zrexpress.app/api/v1/webhooks/endpoints/${old.endpointId}`,{
                        method:"DELETE",
                        headers:{
                            "Authorization":`Bearer ${old.accessToken}`,
                            "X-Tenant-ID":`${old.tenantId}`
                        }
                    })
                }

            }catch(err){
                console.error(`Could not delete endpoint for seller ${sellerId} error:${err.message}`);
            }
        }
        let options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`,
                "X-Tenant-ID":`${tenantId}`
            },
            body:JSON.stringify({
                
                url:`${process.env.BETTER_AUTH_URL}/api/webhook/zrexpress/${webhook_token}`,
                description:`webhook for seller ${sellerId}`,
                eventType:["parcel.state.updated"]
            
            })
            
        }
        let response = await fetch("https://api.zrexpress.app/api/v1/suppliers/webhooks/endpoints",options);
        if(!response.ok){
            return res.status(400).json({message:"Couldn't register endpoint"});
        }
        let endpointData = await response.json();
        let endpointId = endpointData.id;
        let secretOptions = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
              "Authorization":`Bearer ${accessToken}`,
                "X-Tenant-ID":`${tenantId}`
                
            }
        }
        let result = await fetch(`https://api.zrexpress.app/api/v1/webhooks/endpoints/${endpointId}/secret`,secretOptions);
        if(!result.ok){
            return res.status(400).json({message:"Couldn't get endpoint secret"});
        }
        let data = await result.json();
        let endpointSecret = data.secret;
        let credentials = JSON.stringify({
            accessToken,
            tenantId,
            endpointId,
            endpointSecret
        })
        let safeData = encryptApiKey(credentials);
        await pool.query("INSERT INTO seller_integrations (seller_id,provider_name,encrypted_credentials,webhook_token) VALUES($1,'Zrexpress',$2,$3) ON CONFLICT (seller_id,provider_name) DO UPDATE SET encrypted_credentials=EXCLUDED.encrypted_credentials,webhook_token=EXCLUDED.webhook_token",[sellerId,safeData,webhook_token]);

        


    }catch(err){
        return res.status(500).json({message:"Internal server error"});

    }
    
}