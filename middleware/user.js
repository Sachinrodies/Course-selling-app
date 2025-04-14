const jwt=require("jsonwebtoken");
const {USER_JWT_SECRET}=require("../config");

function userMiddleware(res,res,next){
    const token=req.headers.token;
    const response=jwt.verify(token,USER_JWT_SECRET);
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
    userMiddleware:
        userMiddleware
}



