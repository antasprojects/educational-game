const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const authenticator = require("./middleware/logger")

const usersRouter = require('./routers/users');
const resultsRouter = require("./routers/results")
const questionRouter = require('./routers/questions');

const app = express();

app.use(cors())
app.use(express.json());
app.use(logger);

app.get("/", authenticator, (req, res) => {
    res.status(200).json({
      title: "Educational Quizes",
      description: "Api working page"
      
    })
  })

  

app.use("/users", usersRouter);
app.use("/results", resultsRouter)
app.use("/questions", questionRouter)

module.exports = app;