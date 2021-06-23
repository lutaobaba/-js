const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/',async (req,res) => {
    //1.获取前端传递来的用户名与密码
    let {account,password} = req.body
    //2.验证必传参数
    if(!account || !password){
        res.send({
            err:1,
            msg:"请输入账号密码！"
        })
        return
    }
    try{
        const login =await Post.find({account});
        if(login.length>0){
            let flag = password===login[0].password
            if(flag){ //说明密码输入正确
                res.send({
                    err:200,
                    msg:"恭喜您，登录成功！",  
                    id:login[0]._id,
                    account:login[0].account,
                    name:login[0].name
                })
            }else{
                res.send({err:2,msg:"账号或密码输入有误"})
            }
        }else{ //3-2 用户在数据库里面不存在
            res.send({err:3,msg:"此用户不存在，请注册！"})
        }
    }catch(err){
        res.json({ message: err});
    }
});

module.exports = router;