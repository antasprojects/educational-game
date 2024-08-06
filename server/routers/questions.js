const { Router } = require('express');

const questionsContoller = require('../controllers/questions');

const questionRouter = Router();

questionRouter.get("/", questionsContoller.index);

questionRouter.get("/quizdata/:id", questionsContoller.show);

questionRouter.post("/", questionsContoller.create)

module.exports = questionRouter;