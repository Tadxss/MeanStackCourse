const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

// Inserting Post
router.post("", checkAuth, extractFile, PostController.createPost);

// Updating Post
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// Fetching All Posts
router.get("", PostController.getPosts);

// Fetching Single Post
router.get("/:id", PostController.getPost);

// Deleting Post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;