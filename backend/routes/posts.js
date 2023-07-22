const express = require("express");

// Importing Schema / Model
const Post = require('../models/post');

const router = express.Router();

// Inserting New Post
router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    
    post.save().then(createdPost => {
        // Use 201 when adding new data to Database or Something
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id
        });
    });
});

// Updating Post
router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post updated successfully"
        });
    });
});

// Fetching All Posts
router.get("", (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: documents
            });
        });
});

// Fetching Single Post
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json({
                message: "Single Post fetched successfully!",
                post: post
            });
        } else {
            res.status(404).json({
                message: 'Post not found!'
            });
        }
    })
});

// Deleting Post
router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({
                message: "Post deleted!"
            });
        });
});

module.exports = router;