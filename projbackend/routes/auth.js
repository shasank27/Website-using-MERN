const express = require("express");
const router = express.Router();

router.get("/signin", (req,res)=>res.send("In Sign in Page"));

module.exports = router;