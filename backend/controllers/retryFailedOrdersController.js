import pool from "../database/db.js";
import { metaCapi } from "../services/metaService.js";

export let retryFailedOrders = async(req,res)=>{
    let userId=req.user.id;
    let order_number = req.params.order_number
    try{
         let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
        if(sellerRes.rows.length==0){
            return res.status(400).json({message:"Seller profile not found."});
        }
         let sellerId = sellerRes.rows[0].id;
        if(order_number){
            let orderRes = await pool.query("SELECT * FROM orders WHERE seller_id=$1 AND order_number=$2",[sellerId,order_number]);
            if(orderRes.rows.length==0){
                return res.status(400).json({message:"Order not found"});
            }
            let metaResult = await metaCapi(orderRes.rows[0]);
           if(metaResult.success==false){
            return res.status(400).json(metaResult.error);
           }
           return res.status(200).json({message:`Purchase sent to Meta for order ${order.number}`});
        }else{
    let orderRes = await pool.query("SELECT * FROM orders WHERE seller_id=$1 AND meta_status='failed'",[sellerId]);
        let orders = orderRes.rows;
        if(orders.length==0){
            return res.status(400).json({message:"orders not found"});
        }
        let resolved =0;
        let failed=0;
        for(let order of orders){
           let metaResult = await metaCapi(order);
           if(metaResult.success==false){
            failed++;
           }else{
            resolved++;
           }
        }
      
           return res.status(200).json({message:`Purchase sent to Meta for ${resolved} orders`});
        }

        
    
    }catch(err){
return res.status(500).json({message:"Internal server error"});    }
}