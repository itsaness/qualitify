import { getSellerByApiKey } from "../services/sellerApiService.js";
import { getSellerById } from "../services/sellerApiService.js";
import pool from "../database/db.js";

export async function getTracking(req,res){
     let apiKey = req.headers["x-api-key"];
    try{
        let sellerId = await getSellerByApiKey(apiKey);
        let seller = await getSellerById(sellerId);
       if(!seller){
            return res.status(400).json({message:"Seller profile not found"});
        }
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>seller.current_period_end){
            return res.status(400).json({message:"You don't have an active subscription."});
        }
        const {tracking_number,carrier}=req.body;
        const {order_number}=req.params;

        await pool.query("UPDATE orders SET tracking_number=$1 WHERE order_number=$2 AND seller_id=$3 AND carrier=$4",[tracking_number,order_number,seller.id,carrier]);
        return res.status(200).json({message:"Tracking assigned !"});
    }catch(err){
return res.status(500).json({message:"Internal server error"});    }
}