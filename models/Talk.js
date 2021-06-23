const mongoose = require('mongoose');

const TalkSchema = mongoose.Schema({
    account:{
        type:String,
        require:true
    },
    talker:{
        type:String,
        require:true
    },
    title:{
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

module.exports = mongoose.model('Talks',TalkSchema);