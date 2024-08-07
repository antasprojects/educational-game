const express = require('express');
const cors = require('cors');
const path = require("path");

const logger = require('./middleware/logger');
const authenticator = require("./middleware/logger")

const usersRouter = require('./routers/users');
const resultsRouter = require("./routers/results")
const questionRouter = require('./routers/questions');

const app = express();


// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors())
app.use(express.json());
app.use(logger);


app.get("/", (req, res) => {
      res.sendFile("../client/index.html");
  })

  

app.use("/users", usersRouter);
app.use("/results", resultsRouter)
app.use("/questions", questionRouter)

module.exports = app;