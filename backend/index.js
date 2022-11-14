const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

app.get("/posts/values", (req, res) => {
  pgClient.query("SELECT * FROM post").then(posts => {
    console.log('posts', {data: posts.rows});

    res.json({data: posts.rows});
  });
});

app.listen(5000, err => {
  console.log("Listening");
});
