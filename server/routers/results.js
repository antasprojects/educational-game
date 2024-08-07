const { Router } = require('express');
// const authenticator = require("../middleware/authenticator");

const resultsController = require('../controllers/results');

const resultsRouter = Router();

resultsRouter.get("/", resultsController.index);
resultsRouter.post("/", resultsController.create);

module.exports = resultsRouter;