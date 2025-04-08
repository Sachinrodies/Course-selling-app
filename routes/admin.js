const {Router}=require("express");
const adminRouter=Router();
const {adminModel}=require("../db");


adminRouter.post("/signup",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})
adminRouter.post("/signin",(req,res)=>{
    res.json({
        message:"signin endpoints"
    })
})
adminRouter.get("/",(req,res)=>{
    res.json({
        message:"purchase endpoints"
    })
})
adminRouter.put("/course",(req,res)=>{
    res.json({
        message:"purchase endpoints"
    })
})
adminRouter.get("/course/bulk",(req,res)=>{    
    res.json({
        message:"purchase endpoints"
    })
}
)

module.exports={
    adminRouter:
        adminRouter
}
