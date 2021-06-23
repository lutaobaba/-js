const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET BACK ALL TH POSTS
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({ message: err });
    }
});

// router.get('/',(req,res) => {
//     res.send('we are on posts');
// });

// router.get('/specific',(req,res) => {
//     res.send('Specific post');
// });

//SUBMITS A POST
router.post('/', async (req,res) => {
    const post = new Post({
        name:req.body.name,
        account:req.body.account,
        password:req.body.password
    });
    try{
        const login =await Post.find({account:post.account});
        console.log(login);
        if(login.length>0){
            res.send({
                err:1,
                msg:"该账号已被注册！",  
            })
        }else{
            const savedPost = await post.save();
        
            res.send({
                err:200,
                msg:"恭喜您，注册成功！",  
            })
        }   
    }catch(err){
        res.json({ message: err });
    }
});

// router.post('/',(req,res) => {
//     console.log(req.body);
//     const post = new Post({
//         title:req.body.title,
//         description:req.body.description
//     });
    
//     post.save()
//         .then(data => {
//             res.json(data);

//         })
//         .catch(err => {
//             res.json({ message: err});
//         })
// });

//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const post =await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({ message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const removedPost =await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    }catch(err){
        res.json({ message: err});
    }
});

//Update a post
router.patch('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const updatePost =await Post.updateOne(
            { _id: req.params.postId },
            { $set: {password: req.body.password} }
        );
        res.json(updatePost);
    }catch(err){
        res.json({ message: err});
    }
});


module.exports = router;