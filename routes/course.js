const { Router } = require("express");
const { adminMiddleware } = require("../middleware/admin");
const { courseModel } = require("../db");
const {purchaseModel}=require("../db");
const { userMiddleware } = require("../middleware/user");
const courseRouter = Router();

// Protected routes (require admin authentication)
courseRouter.post("/", adminMiddleware, async (req, res) => {
    try {
        const { title, description, price, imageUrl } = req.body;
        const course = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creator_id: req.userId
        });
        res.json({ course });
    } catch (error) {
        res.status(500).json({ message: "Error creating course" });
    }
});

courseRouter.put("/:courseId", adminMiddleware, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, imageUrl } = req.body;
        
        const course = await courseModel.findOneAndUpdate(
            { _id: courseId, creator_id: req.userId },
            { title, description, price, imageUrl },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        res.json({ course });
    } catch (error) {
        res.status(500).json({ message: "Error updating course" });
    }
});

// Public routes
courseRouter.post("/purchase",userMiddleware, async(req, res) => {
    const userId=req.userId;
    const {courseId}=req.body;
    await purchaseModel.create({
      userId:userId,
      courseId:courseId
    })
    res.json({
      message:"purchase successfull"
    })
});

courseRouter.get("/preview",async(req,res)=>{
    const courses=await courseModel.find({});
    res.json({
        courses:courses
    })
})

module.exports = {
    courseRouter
};
