const Course = require("../model/Course");
const User = require("../model/user");

// Get all Course
exports.getAllCourses = async (req, res) => {
  const course = await Course.find({}).populate({path:"user",model:User});
  res.status(200).json({
    course
  });
};

// Create Course
exports.createCourse = async (req, res) => {
  // If you are not logged in, you cannot create a course. login
  if (req.session.userId === undefined) {
    res.status(500).json({
      status: "Failed",
      message: "You Must login",
    });
    // If you are logged in, you can continue.
  } else {
    // If course name is not unique, You can't create a course
    const course = await Course.find({ name: req.body.name });
    if (course.length >= 1) {
      res.status(409).json({
        status: "Failed",
        message: "This Course existing",
      });
    } else {
      // If course name is unique, You can go on.
      try {
        const course = await Course.create({
          name: req.body.name,
          description: req.body.description,
          user:req.session.userId
        });
        res.status(201).json({
          status: "success",
          message: "Course Created",
          data: course,
          request: {
            type: "GET",
            url: "http://localhost:3000/courses",
          },
        });
      } catch (err) {
        res.status(500).json({
          err,
          message: "Something Wrong..",
        });
      }
    }
  }
};

// get One Course
exports.getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (course !== null) {
    res.status(200).json({
      status: "Success",
      message: "One Course By slug",
      data: course,
    });
  } else {
    res.status(404).json({
      status: "Failed",
      message: "Course Not Found",
    });
  }
};

// Update One Course
exports.putCourse = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  // check if there is a course existing
  if (course !== null) {
    (course.name = req.body.name), (course.description = req.body.description);
    const courses = await Course.find({ name: req.body.name });
    // If course name is not unique, You can't create a course
    if (courses.length >= 1) {
      res.status(409).json({
        status: "Failed",
        message: "This course name already in use",
      });
    }
    // If course name is unique, You can go on.
    else {
      course.save();
      res.status(201).json({
        status: "Success",
        message: "You changed something",
        data: course,
      });
    }
  } else {
    res.status(403).json({
      status: "Failed",
      message: "Something Wrong...",
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  // check if there is a course existing
  if (course !== null) {
    course.deleteOne();
    res.status(201).json("course deleted");
  }
  // If no course..
  else {
    res.status(500).json("Course Not Found");
  }
};
