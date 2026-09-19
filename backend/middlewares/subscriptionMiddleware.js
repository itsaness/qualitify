import pool from "../database/db.js";

export const subscriptionsMiddleware = async(req,res,next)=>{
    let userId = req.user.id
    try{
        let rows = await pool.query("SELECT subscription_status,current_period_end FROM sellers WHERE user_id=$1",[userId]);
        if(rows.rows.length==0){
            return res.status(400).json({message:"Seller not found."});
        }
        const seller = rows.rows[0];
        const now = new Date();
        if( seller.subscription_status=="inactive"|| now>new Date(seller.current_period_end)){
            return res.status(400).json({message:"You don't have an active subscription."});
        }
        next();
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}