const User = require("../model/user");

// Get All Users
exports.getAlluser = async (req, res) => {
    const user = await User.find({}).select({'password':0}).populate('courses');
    res.status(200).json({
      status: "success",
      message: "All users",
      user,
    });
  };


  exports.getUser=async(req,res)=>{
    const user= await User.findById(req.params.id)
    res.status(200).json({
        status:"Success",
        message:`User ${user.name}`,
        user:{
            id:user._id,
            name:user.name,
            email:user.email


        }
    })
}



exports.deleteUser=async(req,res)=>{
    if(req.session.userId===undefined){
        res.status(500).json({
            status:"Failed",
            message:"you must Login"
        })
    }else{
        const user= await User.findById(req.session.userId)
       if(user.isAdmin==true){
           const deletedUser= await User.findById(req.params.id)
           if(deletedUser!==null){
           deletedUser.deleteOne()
           res.status(200).json({
            status:"Success",
            message:" User Deleted",  
            
            deletedUser
               
           })}else{
               res.status(404).json({
                   status:"Failed",
                   message:"User is not found"
               })
           }
       }else{
           res.status(500).json({
               status:"Failed",
               message:"You cant delete user"
           })
       }      
        }
    }



