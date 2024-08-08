const fs = require("fs");
const path = require("path");
require('dotenv').config();

const db = require("./connect");

const pathJoin = path.join(__dirname + "/setup.sql");

const sql = fs.readFileSync(pathJoin).toString();

// const sql = fs.readFileSync(__dirname +).toString();

db.query(sql)
  .then(data => {
    db.end();
    console.log("Set up complete");
  })
  .catch(err => console.log(err));

///
