import {betterAuth} from "better-auth";
import "dotenv/config";
import pool from "./database/db.js"



export const auth = betterAuth({
    
    secret:process.env.BETTER_AUTH_SECRET,
    baseURL:process.env.BETTER_AUTH_URL,
    database:pool,
    type:"postgres",
    trustedOrigins:["http://localhost:5173",process.env.BETTER_AUTH_URL,"https://qualitify.app","https://www.qualitify.app"],
    socialProviders:{
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        },
    },  
    databaseHooks:{
        user:{
            create:{
                after:async(user)=>{
                    try{
                    await  pool.query(`INSERT INTO sellers (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,[user.id])
                    console.log("Profile created");
                    }catch(err){
                    console.error(err.message);
                    } 

                }
            }
        }
    }     
});

        