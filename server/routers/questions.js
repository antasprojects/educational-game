const { Router } = require('express');
const authenticator = require("../middleware/authenticator");

const questionsContoller = require('../controllers/questions');

const questionRouter = Router();

questionRouter.get("/", questionsContoller.index);

questionRouter.get("/quizdata/:id", authenticator, questionsContoller.show);

questionRouter.post("/", questionsContoller.create)

module.exports = questionRouter;