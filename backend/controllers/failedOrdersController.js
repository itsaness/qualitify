import pool from "../database/db.js";

export let failedOrdersController = async(req,res)=>{
    let userId = req.user.id;
    try{
      let sellerRes = await pool.query("SELECT id FROM sellers WHERE user_id=$1",[userId]);
        if(sellerRes.rows.length==0){
            return res.status(400).json({message:"Seller profile not found."});
        }
        let sellerId = sellerRes.rows[0].id;
        let ordersRes = await pool.query("SELECT id,order_number,customer_phone,meta_error FROM orders WHERE seller_id=$1",[sellerId]);
        return res.status(200).json(ordersRes.rows);
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    } 
}