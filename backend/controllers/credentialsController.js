import pool from "../database/db.js";
import { encryptApiKey } from "../services/apiKeyService.js";

export let credentialsController = async(req,res)=>{
    let userId=req.user.id;
    let {provider,credentials}=req.body;
    try{
          let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
      if(sellerRes.rows.length ==0){
       return  res.status(400).json({message:"Seller profile not found"});
      }
      let sellerId = sellerRes.rows[0].id;
 let jsonString = JSON.stringify(credentials);
      const safeData = encryptApiKey(jsonString);
      await pool.query(`INSERT INTO seller_integrations (seller_id,provider_name,encrypted_credentials) VALUES ($1,$2,$3) 
        ON CONFLICT (seller_id,provider_name)
        DO UPDATE SET encrypted_credentials=EXCLUDED.encrypted_credentials;
        `,[sellerId,provider,safeData]);
        return res.status(200).json({message:"Integration saved successfully"});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
     
}