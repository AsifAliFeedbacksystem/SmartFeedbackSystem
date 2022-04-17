import feedbacksModel from "../../models/feedbacks/feedbacks.Model.js";
import userModel from "../../models/user/user.Model.js";


// route:  POST api/feedbacks/
// desc:   creating feedback of an authenticated user.
// access: PROTECTED
const postFeedback = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);

        // checking if user exist
        if (!user) {
            return res.status(401).json({ errorMsg: 'Unauthorized' }); // 401 for Unauthorized
        }

        // checking if user can give feedback or not || 24 hours completed?
        if (Date.now() <= user.nextFeedbackDate) {
            const dateTime = user.nextFeedbackDate + "|" + user.nextFeedbackTime;
            return res.status(400).json({ errorMsg: `You have to wait till ${dateTime} for your next feedback` }); // 400 for bad request
        }

        const feedback = new feedbacksModel(req.body);
        feedback.userId = req.userId;
        feedback.time = new Date().toLocaleTimeString();
         // saving user feedback
        await feedback.save();
        

        // updating user
        user.pointsGenerated = user.pointsGenerated + 1;
        user.nextFeedbackDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000) // 24 hours = 60 * 60 * 24 * 1000)
        user.nextFeedbackTime = new Date().toLocaleTimeString();
        await user.save();

        return res.status(201).json({ successMsg: "Feedback generated!", }); //201 for created

    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  GET api/feedbacks/
// desc:   reading all users feedbacks
// access: NOT-PROTECTED
const readAllfeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await feedbacksModel.find().populate("userId");

        if (!feedbacks) {
            return res.status(500).json({ errorMsg: "Server Error" });
        }
        return res.status(200).send(feedbacks);
    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  GET api/feedbacks/:id
// desc:   reading authenticated user feedbacks
// access: NOT-PROTECTED
const readUserFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await feedbacksModel.find({userId: req.params.id }).populate("userId");

        if (!feedbacks) {
            return res.status(500).json({ errorMsg: "Server Error" });
        }
        return res.status(200).send(feedbacks);
    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  POST api/feedbacks/feedbacksByDate
// desc:   reading all feedbacks by date filter.
// access: NOT-PROTECTED
const getFeedbacksByDate = async (req, res, next) => {
    try {

        const feedbacks = await feedbacksModel.find({date: req.body.date }).populate("userId");

        if (!feedbacks) {
            return res.status(500).json({ errorMsg: "Server Error" });
        }
        return res.status(200).send(feedbacks);
    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  POST api/feedbacks/feedbacksByRating
// desc:   reading all feedbacks by rating.
// access: NOT-PROTECTED
const getFeedbacksByRating = async (req, res, next) => {
    try {

        const feedbacks = await feedbacksModel.find({averageRating: req.body.rating }).populate("userId");

        if (!feedbacks) {
            return res.status(500).json({ errorMsg: "Server Error" });
        }
        return res.status(200).send(feedbacks);
    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  DELETE api/feedbacks/:id
// desc:   delete a single feedback by authenticated user by feedback _id.
// access: PROTECTED
const deleteSingleFeedback = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const response = await feedbacksModel.findByIdAndDelete(req.params.id);

        // checking if document is deleted in DB
        if (!response) {
            return res.status(500).send({ errorMsg: "server error" });
        }

        return res.status(200).send({ successMsg: "Deleted successfully" });

    } catch (err) {
        next(err);
        console.log(err);
    }
};

// route:  PATCH api/feedbacks/:id
// desc:   Update a single feedback by authenticated user by feedback _id.
// access: PROTECTED
const updateSingleFeedback = async (req, res, next) => {
    try {

        const response = await feedbacksModel.updateOne({ _id: req.params.id }, { $set: { userFeedback: req.body.userFeedback } });

        // checking if document is updated in DB
        if (response.modifiedCount !== 1) {
            return res.status(500).json({ errorMsg: "server error" })
        }

        return res.status(200).send({ successMsg: "Updated successfully" });

    } catch (err) {
        next(err);
        console.log(err);
    }
};

export {
    readAllfeedbacks,
    postFeedback,
    deleteSingleFeedback,
    updateSingleFeedback,
    readUserFeedbacks,
    getFeedbacksByDate,
    getFeedbacksByRating
}