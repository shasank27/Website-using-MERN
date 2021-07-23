const User = require("../models/user");

exports.getUserById((req, res, next)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"Profile not found"
            })
        }
        req.profile =user;
        next();
    })
})

exports.getUser((req,res)=>{
    return res.json(req.profile)
})