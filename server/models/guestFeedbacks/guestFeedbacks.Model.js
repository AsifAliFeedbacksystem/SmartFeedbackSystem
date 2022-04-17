import mongoose from "mongoose";

const scheme = mongoose.Schema;


const guestsfeedbacksSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone1: {
        type: String,
    },
    userFeedback: {
        type: String,
    },
    averageRating: {
        type: Number,
    },
    date:{
        type:String,
        default: new Date().toISOString().split('T')[0]
    },
    time:{
        type: String,
        default: new Date().toLocaleTimeString()
    }
});

const guestFeedbacksModel = mongoose.model("guestFeedback", guestsfeedbacksSchema);
export default guestFeedbacksModel;