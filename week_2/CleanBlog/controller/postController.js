const Post=require('../models/Post')

exports.getAllPost= async (req,res)=>{
    const post= await Post.find({})
    res.render('index',{
        posts:post
    })
}

exports.getAbout=(req,res)=>{
    res.render('about')
}

exports.getAddPost=(req,res)=>{
    res.render('add_post')
}

exports.postAddPost=(req,res)=>{
    Post.create({
        ...req.body
    })
    
    console.log("Post Created")
    res.redirect('/')
    
}

exports.getByIdPost= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    res.render('post',{
        post:postById
    })
}

exports.getEditPage= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    res.render('edit',{
        post:postById
    })
}


exports.putByIdPost= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    postById.title=req.body.title
    postById.detail=req.body.detail
    postById.save()

    res.redirect('/posts/'+req.params.id)
}

exports.deletePost= async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
}