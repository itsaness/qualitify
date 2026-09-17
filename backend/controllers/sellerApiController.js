import pool from "../database/db.js";
import {getSellerByApiKey} from "../services/sellerApiService.js";
import { getSellerById } from "../services/sellerApiService.js";

export async function getOrder(req,res){
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
    const {
        first_name=null,
        family_name=null,
        address=null,
        wilaya=null,
        commune=null,
        order_number,
        amount,
        customer_phone,
        client_ip,
        user_agent=null,
        fbp=null,
        fbc=null,
        product_list=null,
        
    } = req.body;
    if(!order_number||!amount||!customer_phone||!client_ip){
        return res.status(400).json({message:"Missing required fields (order_number, amount, customer_phone, client_ip)"});
    }

    let order_timestamp = Math.floor(Date.now() / 1000);

    await pool.query("INSERT INTO orders (seller_id,order_number,amount,customer_phone,client_ip,user_agent,fbp,fbclid,order_timestamp,first_name,family_name,address,wilaya,commune,product_list) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ",[seller.id,order_number,amount,customer_phone,client_ip,user_agent,fbp,fbc,order_timestamp,first_name,family_name,address,wilaya,commune,product_list]);
    return res.status(200).json({success:true,order_number:`${order_number}`});
    }catch(err){
return res.status(500).json({message:"Internal server error"});    }
  

    

}