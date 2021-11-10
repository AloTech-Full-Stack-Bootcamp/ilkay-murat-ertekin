const User=require('../model/users')
const bcrypt= require('bcrypt')

exports.getAlluser= async (req,res)=>{
    const user=await User.find({})
    res.status(200).json({
        status:'success',
        message:'All users',
        user
    })
}

exports.createUser= async(req,res)=>{
    const newUser= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    res.status(201).json({
        status:"Success",
        message:"User Created",
        newUser
    })
}

exports.loginUser= async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user){
        bcrypt.compare(req.body.password,user.password,(err,same)=>{
            if(same){
                req.session.userId=user.id
                res.status(200).json({
                    status:"Success",
                    message:"you logined",
                    session:req.session.userId
                })
            }
            else{
                res.status(400).json({
                    status:"Failed",
                    message:"Wrong Password"
                })
            }
        })

    }
    else{
        res.status(404).json({
            status:"Failed",
            message:"User is not Found"
        })
    }
}

exports.logoutUser= async(req,res)=>{
    req.session.destroy()
    res.status(200).json({
        status:"Success",
        message:"You logouted"
    })
}