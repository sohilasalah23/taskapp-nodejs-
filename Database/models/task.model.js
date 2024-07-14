import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, "title is too short"],
    },
    status: {
        type: String,
        required: true,
        enums: ["private", "public"],
        default: "private"
    },
    type: {
        type: String,
        required: true,
        enums: ["text body", "list task"],
        default: "text body"
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

}, {
    timestamps: true
})

const taskModel = mongoose.model("task", schema)
export default taskModel