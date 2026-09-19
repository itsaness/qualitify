import pool from "../database/db.js";
export const fullfillSubscription = async(stringPlanId,userId,checkoutId)=>{
    let planId = Number(stringPlanId);
   
    if(isNaN(planId)){
        throw new Error("invalid plan id");
    }
    let client = await pool.connect();
    try{
       await client.query("BEGIN");
       let checkoutRes = await client.query("SELECT id,subscription_status,current_period_end,checkout_id FROM sellers WHERE checkout_id=$1 FOR UPDATE",[checkoutId]);
     
      
      if(checkoutRes.rows.length==0){
                throw new Error("Seller profile not found");

      } 
      
      if(checkoutRes.rows[0].checkout_id==checkoutId){
        throw new Error("Checkout session already processed");
      }

      const now = new Date();
      if(checkoutRes.rows[0].subscription_status=='active' && new Date(checkoutRes.rows[0].current_period_end) > now){
                throw new Error("Seller already subscribed");

      }
      

        
      
      let sellerRes = await client.query(`UPDATE sellers SET subscription_status=$1,current_period_end=CURRENT_TIMESTAMP+INTERVAL '1 month',checkout_id=$2,plan_id=$3 WHERE user_id=$4 RETURNING id `,['active',checkoutId,planId,userId]);

      if(sellerRes.rowCount == 0){
        throw new Error("Seller profile not found for this user")
      }
      await pool.query("COMMIT");
    }catch(err){
      await client.query("ROLLBACK");
      throw err;
    }finally{
       client.release();
    }
   
     
         
    
    
}