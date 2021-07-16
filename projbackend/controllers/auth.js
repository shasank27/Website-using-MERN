const User = require("../models/user")
exports.signin = (req, res) => {

    res.json({
        "message": "SignInJson"
    })
};

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((error, req)=>{
        if(error){
            console.log(error);
            return res.status(400).json({
                "error":"DB cant track down"
            })
        }
        res.json({
            name : user.name,
            email : user.email,
            id:user._id
        })
    })
};

