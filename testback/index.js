const express = require("express");
const app = express();
const port = 8000;

const admin = function(req, res) {
    return res.send("Hello World");
   
}

const isAdmin=function(req, res, next){
    console.log("in isAdmin");
    next();
}
app.get("/admin/", isAdmin, admin);


app.listen(port, () => console.log("Hey there everyone"));
