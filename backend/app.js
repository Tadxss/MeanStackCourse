const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Importing Routes
const postsRoutes = require("./routes/posts");

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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;