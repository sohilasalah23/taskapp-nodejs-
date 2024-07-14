import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, "title is too short"],
    },
    tasks: {
        type: mongoose.Types.ObjectId,
        ref: "task"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

}, {
    timestamps: true
})

const categoryModel = mongoose.model("category", schema)
export default categoryModel