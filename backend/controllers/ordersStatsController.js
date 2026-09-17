import pool from "../database/db.js";

export let ordersStatsController = async(req,res)=>{
    let userId = req.params.id;
    try{
        let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
        if(sellerRes.rows.length==0){
            return res.status(400).json({message:"Seller profile not found."});
        }
        let sellerId = sellerRes.rows[0].id;
        let statsRes = await pool.query(`SELECT COUNT(*) AS total_orders,
            COUNT(*) FILTER (WHERE meta_status="success") AS successful_orders,
            COUNT(*) FILTER (WHERE meta_status="pending") AS pending_orders,
            COUNT(*) FILTER (WHERE meta_status="failure") AS failed_orders
               WHERE seller_id=$1`,[sellerId]);
          
        return res.status(200).json({statsRes});
                    
    }catch(err){
       return res.status(500).json({message:"Internal server error"});
    }
}