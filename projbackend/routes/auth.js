const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const {signin,signup}= require("../controllers/auth");

router.post("/signin", signin);
router.post("/signup", [
    check("password").isLength({min:5}).withMessage("Password length should be greater than 5 characters"),
    check("email").isEmail().withMessage("Email not in correct format"),
],signup );

module.exports = router;