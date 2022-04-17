import mongoose from "mongoose";
const schema = mongoose.Schema;

const userModelSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    pointsGenerated: {
        type: Number,
    },

    phone1: {
        type: String,
        required: true
    },


    nextFeedbackDate: {
        type: Date,
        // required: true
    },
    nextFeedbackTime: {
        type: String,
        // required: "true"
    },
    userImage: {
        type: String
    }
});

const userModel = mongoose.model("user", userModelSchema);
export default userModel;