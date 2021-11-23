const Course = require("../model/Course");
const User = require("../model/user");

// Get all Course
exports.getAllCourses = async (req, res) => {
  const course = await Course.find({}).select({'_id':0}).populate({
    path:"user",model:User,
    select:{'password':0,'role':0,'isActive':0,'createdAt':0,'updatedAt':0,'_id':0,'courses':0}});
  if(course.length>0){
  res.status(200).json({
    status:"Success",
    message:"All courses",
    course
    
  });
}else{
  res.status(404).json({
    status:"Failed",
    message:"There are no courses"
  })
}}

// Create Course
exports.createCourse = async (req, res) => {
 
    // If course name is not unique, You can't create a course
    const course = await Course.find({ name: req.body.name });
    if (course.length >= 1) {
      res.status(409).json({
        status: "Failed",
        message: "This course existing",
      });
    } else {
      // If course name is unique, You can go on.
      try {
        const course = await Course.create({
          name: req.body.name,
          description: req.body.description,
          user:req.session.userId
        })
        const user=await User.findById(req.session.userId)
        user.courses.push(course._id)
        user.save()
        res.status(201).json({
          status: "Success",
          message: "Course created",
          data: {
            name:course.name,
            description:course.description,
            slug:course.slug,
            createdAt:course.createdAt

          }
          
        });
      } catch (err) {
        res.status(500).json({
          err,
          message: "Something wrong..",
        });
      }
    }
  }
;

// get One Course
exports.getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate({path:'user',model:User});
  if (course !== null) {
    res.status(200).json({
      status: "Success",
      message: "One course by slug",
      data:{
        name:course.name,
        description:course.description,
        teacher:course.user['name'],
        createdAt:course.createdAt.toString(),
        updatedAt:course.updatedAt.toString()
      }
    });
  } else {
    res.status(404).json({
      status: "Failed",
      message: "Course not found",
    });
  }
};

// Update One Course
exports.putCourse = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate({path:'user',model:User});
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
        data: {
          name:course.name,
          description:course.description,
          teacher:course.user['name'],
          createdAt:course.createdAt,
          updatedAt:course.updatedAt
        }
      });
    }
  } else {
    res.status(404).json({
      status: "Failed",
      message: "Course not found",
    });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  // check if there is a course existing
  if (course !== null) {
    course.deleteOne();
    res.status(201).json({
      status:"Success",
      message:"Course deleted"
    });
  }
  // If no course..
  else {
    res.status(404).json({
      status:"Success",
      message:"Course not found"
    });
  }
};
