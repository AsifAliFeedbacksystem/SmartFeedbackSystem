import mongoose from "mongoose";

const scheme = mongoose.Schema;


const feedbacksSchema = new mongoose.Schema({
    userId: {
        type: scheme.Types.ObjectId,
        ref: "user"
    },
    userFeedback: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        required: true
    },
    feedbackDate:{
        type:Date,
        default: Date.now()
    },
    date:{
        type:String,
        default: new Date().toISOString().split('T')[0]
    },
    time:{
        type: String,
    }

});

const feedbacksModel = mongoose.model("feedback", feedbacksSchema);
export default feedbacksModel;