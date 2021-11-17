const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    
  },
  role: {
    type: String,
    enum: ["student", "teacher","admin"],
    default: "student",
    
  },
  isActive: {
    type: Boolean,
    default: false,
    
  }
},{timestamps:true,versionKey:false});

// Before the "save", hash the password
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
