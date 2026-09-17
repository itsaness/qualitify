import pool from "../database/db.js";
import { getSellerById } from "../services/sellerApiService.js";
import { metaCapi } from "../services/metaService.js";

export let maystroWebhookController = async (req,res)=>{
    let webhook_token = req.params.webhook_token;
    try{
       let sellerRes = await pool.query("SELECT seller_id FROM seller_integrations WHERE webhook_token=$1",[webhook_token]);
       let seller = await getSellerById(sellerRes.rows[0].id);
       if(!seller){
        res.status(200).json({message:"Seller profile not found"});
       }
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>new Date(seller.current_period_end)){
            return res.status(200).json({message:"You don't have an active subscription."});
        }
        if(!req.body||!req.body.data){
            return;
        }
        const firstDecode = Buffer.from(req.body.data,"base64").toString("utf-8");
      

        const payload = JSON.parse(firstDecode);

        const tracking_number = payload.tracking_number;
        const status = payload.status;

        if(status=='Livr'){
            let result = await pool.query("UPDATE orders SET status='completed' WHERE tracking_number=$1 AND status !='completed' RETURNING *",[tracking_number])
            let order = result.rows[0];
            if(order){
              await metaCapi(order);
            }
        }
        return res.status(200).json({received:true});
        
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}