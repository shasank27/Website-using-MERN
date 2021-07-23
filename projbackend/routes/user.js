const { request } = require("express");
const express = require("express");
const router= express.Router();

const {isSignedIn}= require("../controllers/auth");
const {getUserById, getUser}= require("../controllers/user");

request.params("userId", getUserById);
router.get("user/:userId")

module.exports= router;
