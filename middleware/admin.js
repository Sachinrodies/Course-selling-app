const jwt=require("jsonwebtoken");
const {ADMIN_JWT_SECRET}=require("../config");

function adminMiddleware(req,res,next){
    const token=req.headers.token;
    try {
        const response=jwt.verify(token,ADMIN_JWT_SECRET);
        if(response){
            req.adminId=response.id;
            next();
        }
    } catch (error) {
        res.status(403).json({
            message:"Invalid credentials"
        });
    }
}

module.exports = {
    adminMiddleware
}