const { Router } = require('express');
const authenticator = require("../middleware/authenticator");

const resultsController = require('../controllers/results');

const resultsRouter = Router();


resultsRouter.get("/", resultsController.index);
resultsRouter.post("/", resultsController.create);
resultsRouter.get("/total-score/:user_id", authenticator, resultsController.totalScore);
resultsRouter.patch("/:id", resultsController.update);
resultsRouter.delete("/:id", resultsController.destroy);


module.exports = resultsRouter;