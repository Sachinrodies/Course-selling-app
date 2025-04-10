const jwt=require("jsonwebtoken");
const JWT_SECRET="sachin_jha";
function auth(res,res,next){
    const token=req.headers.authorization;
    const response=jwt.verify(token,JWT_SECRET);
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
    auth,

    JWT_SECRET
}



