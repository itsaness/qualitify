import { createWebHistory,createRouter } from "vue-router";
import { authClient } from "@/auth.js";
import loginView from "../views/loginView.vue";
import dashboardView from "../views/dashboardView.vue";
import settingsView from "../views/settingsView.vue";
import homeView from "../views/homeView.vue";
import pricingView from "../views/pricingView.vue";
import contactView from "../views/contactView.vue";
import docsView from "../views/docsView.vue";

const routes = [
    {path:"/",name:"home",component:homeView},
    {path:"/pricing",name:"pricing",component:pricingView},
    {path:"/login",name:"login",component:loginView,meta:{requiresGuest:true}},
    {path:"/dashboard",name:"dashboard",component:dashboardView,meta:{requiresAuth:true}},
    {path:"/settings",name:"settings",component:settingsView,meta:{requiresAuth:true}},
    {path:"/contact",name:"contact",component:contactView},
    {path:"/docs",name:"docs",component:docsView}

]

export const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to,from)=>{
    try{
        let {data:session} = await authClient.getSession();
        if(to.meta.requiresGuest){
            if(session){
                return {path:"/"};
            }
        }
        if(to.meta.requiresAuth){
            if(!session){
                return {path:"/login"};
            }
        }
        return true;

    }catch(err){
        if(to.meta.requiresAuth){
            return {path:"/login"};
        }
        return true;


    }

})