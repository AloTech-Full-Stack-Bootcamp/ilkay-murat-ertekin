const User = require("../model/user");

exports.isAuthenticated = (req, res, next) => {
  if (req.session.userId === undefined) {
    return res.status(401).json({
      status: "Failed",
      message: "You must login",
    });
  }
  next();
};

// Role Permission
exports.permRole=(role)=>{
  return async (req,res,next)=>{
  const user= await User.findById(req.session.userId)
  if(!role.includes(user.role)){
    return res.status(403).json({
      status:"Failed",
      message:"Forbidden"
    })
  }
  next()
}}