const {Router}=require("express");
const courseRouter=Router();

courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"signin endpoints"
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"courses preview  endpoints"
    })
})

module.exports={
    courseRouter:
        courseRouter
}
