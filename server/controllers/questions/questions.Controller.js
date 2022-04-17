import questionsModel from "../../models/questions/questions.Model.js"

// route:  POST api/questions/
// desc:   creating a question.
// access: PROTECTED
const createQuestion = async (req, res, next) => {
    try {

        const isGreater = (await questionsModel.countDocuments({})) >= 10;
        if(isGreater){
            return res.status(400).json({ errorMsg: "Maximim questions range is 10" }); //201 for created
        }

        const question = new questionsModel(req.body);
        await question.save();
        return res.status(201).json({ successMsg: "Question generated!" }); //201 for created

    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  GET /api/questions/
// desc:   reading  questions
// access: PROTECTEDD
const readQuestions = async (req, res, next) => {
    try {
        const questions = await questionsModel.find();

        return res.status(200).send(questions); created

    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  DELETE /api/questions/:id
// desc:   deleting a question by question id
// access: PROTECTED
const deleteQuestion = async (req, res, next) => {
    try {
        const response = await questionsModel.findByIdAndDelete(req.params.id);

        if (!response) {
            return res.status(500).send({ errorMsg: "server error" });
        }

        return res.status(200).json({ successMsg: "Question deleted!" });

    } catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  PATCH /api/questions/:id
// desc:   updating a question by question id
// access: PROTECTEDD
const updateQuestion = async (req, res, next) => {
    try {
        const response = await questionsModel.findByIdAndUpdate(req.params.id, { question: req.body.question });

        // checking if document is updated in DB
        if (!response) {
            return res.status(500).json({ errorMsg: "server error" })
        }

        return res.status(200).json({ successMsg: "Question updated!" });

    } catch (err) {
        next(err);
        console.log(err);
    }
};

export {
    createQuestion,
    readQuestions,
    deleteQuestion,
    updateQuestion
}
