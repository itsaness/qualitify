import pool from "../database/db.js";
import crypto from "crypto";


export async function webhookTokenController(req,res){
    let userId = req.user.id;
    let {provider}=req.body;
    try{
        if(!provider){
           return  res.status(400).json({message:"Provider required"})
        }
         let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
      if(sellerRes.rows.length ==0){
       return  res.status(400).json({message:"Seller profile not found"});
      }
      let sellerId = sellerRes.rows[0].id;
      let exist = await pool.query("SELECT webhook_token FROM seller_integrations WHERE seller_id=$1 AND provider_name=$2",[sellerId,provider]);
      if(exist.rows.length>0 && exist.rows[0].webhook_token){
        return res.status(400).json({message:`Webhook token already exist ${exist.rows[0].webhook_token}`});
      }
      let webhook_token = crypto.randomBytes(16).toString("hex");
      await pool.query("INSERT INTO seller_integrations (seller_id,provider_name,webhook_token) VALUES ($1,$2,$3) ON CONFLICT (seller_id,provider_name) DO UPDATE SET webhook_token=EXCLUDED.webhook_token",[sellerId,provider,webhook_token])
      return res.status(200).json({message:"Webhook token created.",webhook_token:`${webhook_token}`});
    }catch(err){
return res.status(500).json({message:err.message});    }

}