const fs = require("fs");
const colors = require("colors");
const sql_db = require("./utils/database");

try {
  fs.unlinkSync("blog.sqlite");
  console.log(`SQLite3 database removed!`.green.underline);
} catch (err) {
  console.log(err);
} finally {
  fs.readFile("./data.json", (err, content) => {
    if (err) console.log(err);
    let posts = JSON.parse(content);
    console.log(`Loading posts into DB`.yellow.bold);
    sql_db.run(
      "CREATE TABLE post (id varchar(255), title varchar(255), content text, posted_by varchar(255), created_at datetime)",
      (err) => {
        if (err) console.log(err);
        let insert = `INSERT INTO post (id, title, content, posted_by, created_at) VALUES (?,?,?,?,?)`;
        posts.forEach((post) => {
          sql_db.run(insert, [
            post.id,
            post.title,
            post.content,
            post.posted_by,
            post.created_at,
          ]);
        });
        console.log(`Loaded posts into DB`.green.bold);
      }
    );
  });
}
