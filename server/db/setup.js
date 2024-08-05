require("dotenv").config();
const fs = require("fs");
const path = require("path");
console.log(process.env.DB_URL)
const db = require("./connect");

const pathJoin = path.join(__dirname + "/setup.sql");

const sql = fs.readFileSync(pathJoin).toString();
console.log(sql)
// const sql = fs.readFileSync(__dirname +).toString();

db.query(sql)
  .then(data => {
    db.end();
    console.log("Set up complete");
  })
  .catch(err => console.log(err));