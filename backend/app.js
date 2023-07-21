const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Importing Schema / Model
const Post = require('./models/post');

const app = express();

// Connecting to MongoDB
mongoose.connect("mongodb+srv://Tadxss:TbdePGt9rlmS5Faf@meanstackcluster.g5vvi5p.mongodb.net/mean-stack?retryWrites=true").
    then(() => {
        console.log("Connected to MongoDB Database");
    })
    .catch(() => {
        console.log("Connection Failed!");
    });

// This will return/parse valid JSON request to 
// parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting Up CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

// Inserting New Post
app.post("/api/posts", (req, res, next) => {
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

// Fetching All Posts
app.get("/api/posts", (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: documents
            });
        });
});

// Deleting Post
app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({
                message: "Post deleted!"
            });
        });
});

module.exports = app;