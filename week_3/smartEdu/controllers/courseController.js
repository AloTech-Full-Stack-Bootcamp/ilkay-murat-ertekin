const Course = require("../model/Course");
const User =require("../model/users")

exports.getAllCourses = async (req, res) => {
  const course = await Course.find({});
  res.status(200).json({
    course,
  });
};

exports.createCourse = async (req, res) => {

    if(req.session.userId===undefined){
        res.status(500).json({
            status:"Failed",
            message:"You Must login"
        })
    }else{
    const course=await Course.find({name:req.body.name})
    if(course.length>=1){
        res.status(409).json({
            status:"Failed",
            message:"This Course existing"
        })
    }
    else{
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
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
}}}

exports.getCourseBySlug=async(req,res)=>{

        const course=await Course.findOne({slug:req.params.slug})
        if(course!==null){
        res.status(200).json({
            status:"Success",
            message:"One Course By slug",
            data:course

        })
    }else{
        res.status(404).json({
            status:"Failed",
            message:"Course Not Found"
        })
    }}
    
    


exports.putCourse=async(req,res)=>{
    
        const course=await Course.findOne({slug:req.params.slug})
        if(course!==null){
            course.name=req.body.name,
            course.description=req.body.description
            const courses=await Course.find({name:req.body.name})
            if(courses.length>=1){
                res.status(409).json({
                    status:"Failed",
                    message:"This course name already in use"
                })
            }
            else{
            course.save()
            res.status(201).json({
                status:"Success",
                message:"You changed something",
                data:course
            })
        }}
        else{
            res.status(403).json({
                status:"Failed",
                message:"Something Wrong..."
            })
        }
    }
    
exports.deleteCourse=async(req,res)=>{
    const course=await Course.findOne({slug:req.params.slug})
    if(course!==null){
        course.deleteOne()
        res.status(201).json('course deleted')
    }
    else{
        res.status(500).json('Course Not Found')
    }
}

