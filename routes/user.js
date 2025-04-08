const {Router}=require("express");
const userRouter=Router();


userRouter.post("/signup",(req,res)=>{
    res.json({
        message:"signup endpoint"
    })
})

userRouter.post("/signin",(req,res)=>{
    res.json({
        message:"signin endpoints"
    })
})
userRouter.get("/purchase",(req,res)=>{
    res.json({
        message:"purchase endpoints"
    })
})

module.exports={
    userRouter:
        userRouter
}