require('dotenv').config(); //You can use your own environment variables without exposing them to the public when posting this on GitHub.
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
//const tweetRouter = require('./api/tweets/tweet.router');

app.use(express.json()); //Middleware that parses body of request into json, without this, we can't use body of payload from request
app.use('/api/users', userRouter);
//app.use('/api/tweets', tweetRouter);

const port = process.env.APP_PORT;
app.listen(port, () =>{
  console.log('Server is running on port: ', port);
});