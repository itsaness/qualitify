import pool from "../database/db.js";
import { metaCapi } from "../services/metaService.js";
import {getSellerByApiKey} from "../services/sellerApiService.js";
import { getSellerById } from "../services/sellerApiService.js";


export async function carrierToMetaController(req,res){
    let api_key = req.headers["x-api-key"];
    const {tracking_number,status}=req.body;
     if(status !== 'completed'){
       return res.status(200).json({received:true});
    }
    let order;
    try{
    let sellerId = await  getSellerByApiKey(api_key);
    let seller = await getSellerById(sellerId);
    if(!seller){
            return res.status(400).json({message:"Seller profile not found"});
        }
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>seller.current_period_end){
            return res.status(200).json({message:"You don't have an active subscription."});
        }
    const result = await pool.query("UPDATE orders SET status='completed' WHERE tracking_number=$1 AND status!='completed' AND seller_id=$2 RETURNING *",[tracking_number,sellerId]);
    order = result.rows[0];
   

    if(!order){
        return res.status(200).json({received:true});
    }
    let metaResult = await metaCapi(order);
    if(metaResult.success==false){
        return res.status(400).json({message:metaResult.error});
    }
    return res.status(200).json({message:`Purchase sent to Meta for order ${order.order_number}`});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }



}
    
    
   

