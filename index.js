const express=require("express");
require('dotenv').config();
const dbConnectionString=process.env.DATABASE_URL;
const mongoose=require("mongoose");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");




const app=express();





app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);
async function main(){
    await mongoose.connect(dbConnectionString,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("db connected");
    }
    ).catch((err)=>{
        console.log("db connection error",err);
    });
    app.listen(3000);
    
}
main();






