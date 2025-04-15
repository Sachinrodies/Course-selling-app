const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new schema({
    name: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
})

const adminSchema = new schema({
    name: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creator_id: ObjectId,
})

const purchaseSchema = new schema({
    userId: ObjectId,
    courseId: ObjectId,
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}