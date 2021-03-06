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
    message: "User created",
    name:newUser.name,
    email:newUser.email,
    role:newUser.role
  });
};
// Login user and define session ID
exports.loginUser = async (req, res) => {
  
  if(req.session.userId!==undefined){
    res.status(409).json({
      status:"Failed",
      message:"You are already logged in"
    })
  }else{
  const user = await User.findOne({ email: req.body.email });
  
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (same) {
        req.session.userId = user.id;
        res.status(200).json({
          status: "Success",
          message: "You logined",
          session: req.session.userId,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Wrong password",
        });
      }
    });
  } else {
    res.status(404).json({
      status: "Failed",
      message: "User is not found",
    });
  }
}};

//Logout User and Destroy Session ID
exports.logoutUser = async (req, res) => {
  if(req.session.userId!==undefined){
  req.session.destroy();
  res.status(200).json({
    status: "Success",
    message: "You logouted",
  });
}else{
  res.status(409).json({
    status:"Failed",
    message:"You are not already logged in"
  })
}}
