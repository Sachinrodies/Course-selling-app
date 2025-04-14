const jwt=require("jsonwebtoken");
const {ADMIN_JWT_SECRET}=require("../config");

function adminMiddleware(res,res,next){
    const token=req.headers.token;
    const response=jwt.verify(token,ADMIN_JWT_SECRET);
    if(response){
        res.userId=token.userId;
        next();

    }
    else{
       res.status(403).json({
        message:"Invalid credentials"
       })
    }

}

module.exports={
    adminMiddleware:
        adminMiddleware
   
}



