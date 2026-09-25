 import pool from "../database/db.js";
 import { getSellerById } from "./sellerApiService.js";
 import { hashPhone } from "./hashPhoneService.js";
 import { decryptApiKey } from "./apiKeyService.js";
 import crypto from "crypto";
 import "dotenv/config";
function hashString(str){
    if(!str) return undefined;
   return crypto.createHash('sha256').update(str.trim().toLowerCase()).digest("hex")

}

 export let metaCapi = async (order)=>{
     try{
    const seller = await getSellerById(order.seller_id);
     if(!seller){
        throw new Error("Missing Seller Data.");
     }
    let userData = {};
    if(order.client_ip){
        userData.client_ip_address=order.client_ip;
    }
    if(order.customer_phone){
        userData.ph=[hashPhone(order.customer_phone)];
    }
    if(order.fbp){
        userData.fbp=order.fbp
    }
    if(order.fbc){
        userData.fbc=order.fbc;
    }
    if(order.user_agent){
        userData.client_user_agent=order.user_agent;
    }
    if(order.first_name){
        userData.fn=[hashString(order.first_name)];
    }
     if(order.family_name){
        userData.ln=[hashString(order.family_name)];
    }
     if(order.commune){
        userData.ct=[hashString(order.commune)];
    }
     if(order.wilaya){
        userData.st=[hashString(order.wilaya)];
    }
    let customData ={
 currency:order.currency,
    
    }
    if(order.amount){
        customData.value=order.amount;
    }
    /* product_list */
    if(order.product_list){
        try{
            const products = JSON.parse(order.product_list);
            if(Array.isArray(products)&&products.length>0){
                let content_ids=[];
                let contents = [];
                let num_items=0;
                products.forEach(item=>{
                     if(item.id){
                        content_ids.push(item.id);
                        contents.push({
                              id:item.id,
                              quantity:item.quantity||1,
                              item_price:parseFloat(item.price||0)

                        });
                        num_items+=(item.quantity||1);
                     }
                });
                customData.content_type="product";
                customData.content_ids=content_ids;
                customData.contents=contents;
                customData.num_items=num_items;
            }
        }catch(err){
            console.error(`Invalid JSON in product_list for order ${order.order_number}`)
        }
    }



    const capiPayload = {
        data:[{
            event_name:'Purchase',
            event_time:order.created_at ? Math.floor(new Date(order.created_at).getTime()/1000):Math.floor(Date.now()/1000),
            action_source:'website',
            event_id:order.order_number,
            user_data:userData,
            custom_data:customData
        }

            

        ]
    }
    let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json" 
        },
        body:JSON.stringify(capiPayload)
        


    }
    let credentialsRes = await pool.query("SELECT encrypted_credentials FROM seller_integrations WHERE provider_name=$1 AND seller_id=$2",['Meta',seller.id]);
    if(credentialsRes.rows.length==0){
        return ({success:false,error:"Meta credentials not found"})
    }
    let encryptedCredentials = decryptApiKey(credentialsRes.rows[0].encrypted_credentials)
    let credentials = JSON.parse(encryptedCredentials);
    let result = await fetch(`https://graph.facebook.com/${process.env.META_GRAPH_VERSION}/${credentials.meta_pixel_id}/events?access_token=${credentials.meta_access_token}`,{...options,signal:AbortSignal.timeout(10_000)});
    let metaResponse = await result.json();
    if(!result.ok){
        await pool.query("UPDATE ORDERS SET meta_status='failure',meta_sent_at=NOW(),meta_error=$1 WHERE order_number=$2",[metaResponse.error?.message,order.order_number]);
        return ({success:false,error:metaResponse.error?.message});
    }
    await pool.query("UPDATE ORDERS SET meta_status='success',meta_sent_at=NOW() WHERE order_number=$1",[order.order_number]);
    console.log(`Purchase successfully sent to Meta for order ${order.order_number}`);
    return ({success:true});



     }catch(err){
        try{
               await pool.query("UPDATE ORDERS SET meta_status='failure',meta_sent_at=NOW(),meta_error=$1 WHERE order_number=$2",[err.message,order.order_number]);

        }catch(dbErr){
            console.error("failed to write meta error to db for order:",order.order_number);
        } 
       return ({success:false,error:err.message});
    }
    
}
 
 