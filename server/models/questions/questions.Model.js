
import mongoose from "mongoose";

const questionsSchema =  new mongoose.Schema({
    question: {
        type: String,
        required:true
    }
});

const questionsModel =  mongoose.model("question", questionsSchema);
export default questionsModel;