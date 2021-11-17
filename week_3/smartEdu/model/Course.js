const mongoose = require("mongoose");
const slugify = require("slugify");

// Course Schema
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
},{timestamps:true,versionKey:false});
// Before the "validate", generate the slug from the course name
CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
