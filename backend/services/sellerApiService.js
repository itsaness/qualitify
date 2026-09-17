import pool from "../database/db.js";
import {encryptApiKey} from "./apiKeyService.js";
export async function getSellerByApiKey(apiKey){
  try{
   let encryptedKey = encryptApiKey(apiKey);
   let {rows} = await pool.query("SELECT id FROM sellers WHERE api_key=$1",[encryptedKey]);
   return rows[0]?.id;
}catch(err){
    throw err;
}
}
export async function getSellerById(seller_id){
    try{
     let {rows} = await pool.query("SELECT * FROM sellers WHERE id=$1",[seller_id]);
     return rows[0];
    }catch(err){
      throw err;
    }
}