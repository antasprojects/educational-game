const { Router } = require('express');

const resultsController = require('../controllers/results');

const resultsRouter = Router();

resultsRouter.get("/", resultsController.index);
resultsRouter.post("/", resultsController.create);

module.exports = resultsRouter;