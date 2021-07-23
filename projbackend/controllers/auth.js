const User = require("../models/user");
var expressjwt = require("express-jwt");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User Email doesn't exists",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password don't match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);

    res.cookie("token", token, { expires: new Date(Date.now() + 9000) });

    const { _id, name, email, role } = user;

    res.json({ token, user: { _id, name, email, role } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out successfully",
  });
};
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const user = new User(req.body);
  user.save((error, req) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "DB cant track down",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.isSignedIn = expressjwt({
  secret: process.env.SECRETKEY,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  var checker = req.profile && req.id && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "You are not admin",
    });
  }
  next();
};
