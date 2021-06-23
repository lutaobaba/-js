const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    answeredId:{
        type:String,
        require:true
    },
    account:{
        type:String,
        require:true
    },
    answerer:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Replies',ReplySchema);