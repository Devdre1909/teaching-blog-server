const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

const db = require("../utils/database");

const fetchAllPosts = (req, res, next) => {
  db.all("SELECT * FROM post ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Unable to get post" });
    }
    return res.status(200).json({ posts: rows });
  });
};
//
const addPost = (req, res, next) => {
  let { title, content, posted_by } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "invalid data" });
  let id = uuidv4();
  let created_at = dayjs().format("YYYY-MM-DD hh:mm:ss");
  posted_by = posted_by || "anonymous";

  let stmt =
    "INSERT INTO post (id, title, content, posted_by, created_at) VALUES (?,?,?,?,?)";
  let params = [id, title, content, posted_by, created_at];
  db.run(stmt, params, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
  }).get(`SELECT * FROM post WHERE id = '${id}'`, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json({
      message: "success",
      post: row,
    });
  });
};

const editPostById = (req, res, next) => {
  let { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid data" });
  let { title, content } = req.body;
  let stmt = `UPDATE post SET 'title' = ?, 'content' = ? WHERE id = ?`;
  db.run(stmt, [title, content, id], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
  }).get(`SELECT * FROM post WHERE id = '${id}' `, (err, row) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
    return res.json({
      message: "post edit success",
      post: row,
    });
  });
};

const deletePostById = (req, res, next) => {
  let { id } = req.params;
  if (!id) return res.status(400).json({ message: "invalid data" });
  let stmt = `DELETE FROM post WHERE id = '${id}'`;
  db.run(stmt, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json({
      message: "post deleted",
    });
  });
};

module.exports = {
  addPost,
  editPostById,
  fetchAllPosts,
  deletePostById,
};
