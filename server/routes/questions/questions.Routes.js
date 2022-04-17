import express from "express";
import {
    createQuestion,
    readQuestions,
    deleteQuestion,
    updateQuestion
} from "../../controllers/questions/questions.Controller.js"
import authentication from "../../middlewares/authentication.js"

const router = express.Router();


// route:  POST /api/questions/
// desc:   creating a question
// access: PROTECTED
router.post("/", createQuestion);


// route:  GET /api/questions/
// desc:   reading  questions
// access: PROTECTED
router.get("/", readQuestions);


// route:  DELETE /api/questions/:id
// desc:   deleting a question by question id.
// access: PROTECTED
router.delete("/:id", deleteQuestion);


// route:  PATCH /api/questions/:id
// desc:   updating a question by question id.
// access: PROTECTED
router.patch("/:id", updateQuestion);

export default router;