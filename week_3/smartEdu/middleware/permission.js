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

exports.isAdmin = (req, res, next) => {
  const user = User.findById(req.session.userId);
  if (user.isAdmin !== true) {
    return res.status(403).json({
      status: "Failed",
      message: "You Are not Admin",
    });
  }
  next();
};
