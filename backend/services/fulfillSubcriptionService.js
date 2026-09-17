import pool from "../database/db.js";
export const fullfillSubscription = async(stringPlanId,userId,checkoutId)=>{
    let planId = Number(stringPlanId);
   
    if(isNaN(planId)){
        throw new Error("invalid plan id");
    }
   
      let checkoutRes = await pool.query("SELECT id FROM sellers WHERE checkout_id=$1",[checkoutId]);
         
      if(checkoutRes.rows.length>0){
        throw new Error("Already subscribed");
      }
      
      await pool.query(`UPDATE sellers SET subscription_status=$1,current_period_end=CURRENT_TIMESTAMP+INTERVAL '1 month',checkout_id=$2,plan_id=$3 WHERE user_id=$4 `,['active',checkoutId,planId,userId]);
         
    
    
}