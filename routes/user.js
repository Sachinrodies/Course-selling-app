const {Router}=require("express");
const {userModel}=require("../db");

const {z}=require("zod");
const{auth,JWT_SECRET}=require("../auth");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userRouter=Router();




userRouter.post("/signup",async (req,res)=>{

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
        const existingUser=await userModel.findOne({
            email:email
        })
        if(existingUser){
            res.json({
                message:"User already exists",
            })
            return ;
        }   
    
   
    
        const hashedPassword=await bcrypt.hash(password,10);
        await userModel.create({
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
   
});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userModel.findOne({ email: email });

        if (!response) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, response.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
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
});

userRouter.get("/purchase",(req,res)=>{
    res.json({
        message:"purchase endpoints"
    })
})

module.exports={
    userRouter:
        userRouter
}