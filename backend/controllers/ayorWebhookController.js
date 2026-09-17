import pool from "../database/db.js";
import { metaCapi } from "../services/metaService.js";

export let ayorWebhookController = async(req,res)=>{
    let webhook_token = req.params.webhook_token;

    try{
        let sellerRes = await pool.query("SELECT seller_id FROM seller_integrations WHERE webhook_token=$1",[webhook_token]);
        let seller = await getSellerById(sellerRes.rows[0].id);
        if(!seller){
            return res.status(200).json({message:"Seller profile not found"});
        }
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>new Date(seller.current_period_end)){
            return res.status(200).json({message:"You don't have an active subscription."});
        }
        let sellerId = seller.id;
       res.status(200).json({received:true});
        if(!req.body||!req.body.message||!req.body.message.data){
            return;
        }
        let eventType = req.body.message.attributes.event_type;
        let decodedString = Buffer.from(req.body.data,base64).toString("utf-8");
        let payload = JSON.parse(decodedString);

        const order_number = payload.order_id;
        if(eventType == "order.created"){
            let phone = payload.client_info.phone_number;
            let amount = payload.total_price
            let first_name = payload.client_info.full_name;
            let commune = payload.client_info.city;
            let wilaya = payload.client_info.state;
            let fbp = null, fbc =null;
            if(Array.isArray(payload.custom_fields)){
                const fbpField = payload.custom_fields.find(f=>f.field_name=="fbp");
                const fbcField = payload.custom_fields.find(f=>f.field_name=="fbc");
                if(fbpField){
                    fbp = fbpField.value;
                }
                if(fbcField){
                    fbc = fbcField.value;
                }
            }
            await pool.query("INSERT INTO orders (seller_id,order_number,amount,customer_phone,fbp,fbc,first_name,commune,wilaya) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",[sellerId,order_number,amount,phone,fbp,fbc,first_name,commune,wilaya,]);

        }
        if(eventType=="order.delivered"){
            let result = await pool.query("UPDATE orders SET status='completed' WHERE order_number=$1 AND status!='completed' RETURNING *",[order_number]);
            let order = result.rows[0];
            if(order){
              await metaCapi(order);  
            }
            


        }

        

}catch(err){
   return res.status(500).json({message:"Internal server error"});
}
}