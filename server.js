const express = require("express");
const logger = require("morgan");
const colors = require("colors");

const sql_db = require("./utils/database");
const routes = require("./routes");

const server = express();

server.use(logger("dev"));
server.use(express.json());
server.use("/api/v1/post", routes.postRoute);

server.use((req, res, next) => {
  res.status(400).json({
    message: "Not found",
  });
});

// sql_db.run(
//   "CREATE TABLE post (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, content text)",
//   (err) => {
//     if (err) console.log(err);
//     let insert = `INSERT INTO post (title, content) VALUES (?,?)`;
//     sql_db.run(insert, ["Post one", "content for post 1"]);
//     sql_db.run(insert, ["Post two", "content for post 2"]);
//     sql_db.run(insert, ["Post three", "content for post 2"]);
//   }
// );

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`.yellow.bold);
});
