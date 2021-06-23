const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    account:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Posts',PostSchema);