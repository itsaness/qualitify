import crypto from "crypto";
import pool from "../database/db.js";

export let apiKeyController = async (req,res)=>{
    let userId = req.user.id;
    try{
        const rawApiKey = "s2s_sk_"+ crypto.randomBytes(24).toString("hex");
        const hashedApiKey = crypto.createHash("sha256").update(rawApiKey).digest("hex");
        await pool.query("UPDATE sellers SET api_key=$1 WHERE user_id=$2",[hashedApiKey,userId]);
        return res.status(200).json({apiKey:rawApiKey});

    }catch(err){
   return res.status(500).json({message:"Internal server error"});
    }}
