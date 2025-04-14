const {Router}=require("express");
const adminRouter=Router();
const {adminModel}=require("../db");
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {ADMIN_JWT_SECRET}=process.env;
const {adminMiddleware}=require("../middleware/admin");







adminRouter.post("/signup",async (req,res)=>{
    const requireBody=z.object({
        name:z.string().min(1).max(20),
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(30).refine((password)=>/[a-z]/.test(password),{
            message:"password must contain at least one lowercase letter"
        })
        .refine((password)=>/[A-Z]/.test(password),{
            message:"password must contain at least one uppercase letter"

        })
        .refine((password)=>/[\W_]/.test(password),{
            message:"password must contain at least one special character"
        })
        .refine((password)=>/\d/.test(password),{
            message:"password must contain at least one number"
        }),
        firstName:z.string().min(1).max(20),
        lastName:z.string().min(1).max(20),

    })
    const result=requireBody.safeParse(req.body);
    if(!result.success){
        res.json({
            message:"validation error",
            error:result.error
        })
        return ;
    }
    



    const {name,email,password,firstName,lastName}=req.body;

    try{
        const existingUser=await adminModel.findOne({
            email:email
        })
        if(existingUser){
            res.json({
                message:"User already exists",
            })
            return ;
        }   
    
   
    
        const hashedPassword=await bcrypt.hash(password,10);
        await adminModel.create({
            name:name,
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
            });
            res.json({
                message:"user created successfuly"
            });
        }
       
        

    catch(e){
        res.status(500).json({
            message:"Internal server error",
            error:e.message
        });
      
    
    }
    
})
adminRouter.post("/signin",async (req,res)=>{
    const { email, password } = req.body;

    try {
        const response = await adminModel.findOne({ email: email });

        if (!response) {
            return res.status(401).json({
                message: "Admin not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, response.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: response._id.toString() }, ADMIN_JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
      
  
})
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
   const adminId=req.adminId;
   const {title,description,price,imageUrl}=req.body;
   
    const course=await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creator_id:adminId



    })
    res.json({
        message:"course created successfully",
        course_id:course._id,
        
        
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
