import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: [2, "firstName is too short"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    }

},
    { timestamps: true }
)


const userModel = mongoose.model("user", schema)



export default userModel