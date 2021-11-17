const User = require("../model/user");
const bcrypt = require("bcrypt");


// Create A user and response New User
exports.register = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    status: "Success",
    message: "User Created",
    name:newUser.name,
    email:newUser.email,
    role:newUser.role
  });
};
// Login user and define session ID
exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (same) {
        req.session.userId = user.id;
        res.status(200).json({
          status: "Success",
          message: "you logined",
          session: req.session.userId,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Wrong Password",
        });
      }
    });
  } else {
    res.status(404).json({
      status: "Failed",
      message: "User is not Found",
    });
  }
};

//Logout User and Destroy Session ID
exports.logoutUser = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    status: "Success",
    message: "You logouted",
  });
};
