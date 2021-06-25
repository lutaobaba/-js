const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply');

//GET BACK ALL TH POSTS
router.get('/', async (req,res) => {
    try{
        const replies = await Reply.find();
        res.json(replies);
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
    const replies = new Reply({
        answeredId:req.body.answeredId,
        account:req.body.account,
        answerer:req.body.answerer,
        description:req.body.description
    });
    try{
        if(replies.account==undefined||replies.answerer==undefined){
            res.send({
                err:1,
                msg:"账号信息已过期！请重新登录！",  
            })
        }
        else{
            const savedPost = await replies.save();
            res.send({
                err:200,
                msg:"回复成功！",  
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

router.post('/thisReply', async (req,res) => {
    let {answeredId}=req.body
    try{
        const replies =await Reply.find({answeredId});
        res.json(replies);
    }catch(err){
        res.json({ message: err});
    }
});


//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const replies =await Reply.findById(req.params.postId);
        res.json(replies);
    }catch(err){
        res.json({ message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const removedPost =await Reply.remove({ _id: req.params.postId });
        res.json(removedPost);
    }catch(err){
        res.json({ message: err});
    }
});

//Update a post
router.patch('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const updatePost =await Reply.updateOne(
            { _id: req.params.postId },
            { $set: {password: req.body.password} }
        );
        res.json(updatePost);
    }catch(err){
        res.json({ message: err});
    }
});


module.exports = router;