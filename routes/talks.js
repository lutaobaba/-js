const express = require('express');
const router = express.Router();
const Talk = require('../models/Talk');

//GET BACK ALL TH POSTS
router.get('/', async (req,res) => {
    try{
        const talks = await Talk.find();
        res.json(talks);
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
    const talks = new Talk({
        account:req.body.account,
        talker:req.body.talker,
        title:req.body.title,
        description:req.body.description
    });
    try{
        if(talks.account==undefined||talks.talker==undefined){
            res.send({
                err:1,
                msg:"账号信息已过期！请重新登录！",  
            })
        }
        else{
            const savedPost = await talks.save();
            res.send({
                err:200,
                msg:"发表成功！",  
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
        const talks =await Talk.findById(req.params.postId);
        res.json(talks);
    }catch(err){
        res.json({ message: err});
    }
});

router.post('/myTalks', async (req,res) => {
    let {account}=req.body
    try{
        const myTalks =await Talk.find({account});
        res.json(myTalks);
    }catch(err){
        res.json({ message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const removedPost =await Talk.remove({ _id: req.params.postId });
        res.json(removedPost);
    }catch(err){
        res.json({ message: err});
    }
});

//Update a post
// router.patch('/:postId', async (req,res) => {
//     // console.log(req.params.postId);
//     try{
//         const updatePost =await Talk.updateOne(
//             { _id: req.params.postId },
//             { $set: {
//                     title: req.body.title,
//                     description:req.body.description
//                 } 
//             }
//         );
//         res.json(updatePost);
//     }catch(err){
//         res.json({ message: err});
//     }
// });

router.post('/:postId', async (req,res) => {
    // console.log(req.params.postId);
    try{
        const updatePost =await Talk.updateOne(
            { _id: req.params.postId },
            { $set: {
                    title: req.body.title,
                    description:req.body.description
                } 
            }
        );
        res.send({
            err:200,
            msg:"修改成功",  
        })
    }catch(err){
        res.json({ message: err});
    }
});


module.exports = router;