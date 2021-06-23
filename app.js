const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// //Middlewares
// app.use('/posts',()=>{
//     console.log('this is a middlerware running');
// })

//Import Routes
const postsRoute = require('./routes/posts');
const talksRoute = require('./routes/talks');
const loginRoute = require('./routes/login');
const replyRoute = require('./routes/replies');

app.use('/posts',postsRoute);
app.use('/talks',talksRoute);
app.use('/login',loginRoute);
app.use('/replies',replyRoute);

//ROUTES
app.get('/',(req,res) => {
    res.send('we are on home');
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true,useUnifiedTopology: true},
    ()=>console.log('susssss')
);


//How to we start Listening to the server
app.listen(9527);
