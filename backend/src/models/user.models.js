import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: [6, 'Password must be atleast 6 characters long']
    }
}, { timestamps: true })

const user = mongoose.model("User", userSchema);
export default user;