const sqlite = require("sqlite3").verbose();

const sql_db = new sqlite.Database("blog.sqlite", (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else console.log(`Connected to Database`.cyan.bold);
});

module.exports = sql_db;
