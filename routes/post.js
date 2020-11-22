const express = require("express");

const {
  addPost,
  fetchAllPosts,
  deletePostById,
  editPostById,
} = require("../controllers/post");

const router = express.Router();

router.route("/").get(fetchAllPosts).post(addPost);
router.route("/:id").delete(deletePostById).put(editPostById);

module.exports = router;
