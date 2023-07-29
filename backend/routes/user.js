const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

// Signing Up User
router.post("/signup", UserController.createUser);

// Logging In User
router.post("/login", UserController.userLogin);

module.exports = router;