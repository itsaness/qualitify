import pool from "../database/db.js";
import { decryptApiKey } from "../services/apiKeyService.js";

const maskSecret = (secret)=>{
    if(!secret){
        return null;
    }
    if(secret.length<4){
        return "••••";
    }
    return "••••••••••••"+secret.slice(-4);

}

export let accessCredentialsController = async(req,res)=>{
    let provider = req.params.provider
    let userId = req.user.id;
    try{
        let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
        if(sellerRes.rows.length==0){
            return res.status(400).json({message:"seller profile not found"});
        }
        let sellerId = sellerRes.rows[0].id;
        let credentialsRes = await pool.query("SELECT encrypted_credentials,webhook_token FROM seller_integrations WHERE seller_id=$1 AND provider_name=$2",[sellerId,provider]);
        if(credentialsRes.rows.length==0){
            return res.status(400).json({message:"no credentials found"});
        }
        let decryptedString = decryptApiKey(credentialsRes.rows[0].encrypted_credentials);
        let credentials = JSON.parse(decryptedString);
        let safePayload = {isConfigured:true};
        if(provider == "Yalidine"){
            safePayload.webhook_token=credentialsRes.rows[0].webhook_token;
            safePayload.webhook_secret=maskSecret(credentials.webhook_secret);
            
        }
        else if(provider == "Meta"){
            safePayload.meta_pixel_id=credentials.meta_pixel_id;
            safePayload.meta_access_token=maskSecret(credentials.meta_access_token);
            
        }else if(provider =="Maystro"){
            safePayload.webhook_token=credentialsRes.rows[0].webhook_token;
        }else if(provider =="Ayor"){
            safePayload.webhook_token=credentialsRes.rows[0].webhook_token;
        }

        return res.status(200).json(safePayload);

    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}