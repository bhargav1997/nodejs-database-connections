/* 
I can show you how to implement session management in your Node.js application using Express.js and MongoDB. We’ll use the express-session package for session management and connect-mongo for storing our sessions in MongoDB.

First, install the necessary packages by running npm install express-session connect-mongo in your project directory.

Then, in your app.js file, you can use express-session and connect-mongo like this:
*/
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const client = require('./db');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ client: client })
}));

// Your routes go here

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
/*
In this setup, express-session is used to handle sessions, and connect-mongo is used to store the session data in MongoDB. The SESSION_SECRET environment variable is used as the secret for the session. This should be a long, unguessable string.

Now, when a user logs in, you can store user information in req.session. For example:
*/
app.post('/login', (req, res) => {
  // Authenticate the user, then...
  req.session.user = {
    id: user._id,
    username: user.username
  };
  res.redirect('/');
});

// And when a user logs out, you can destroy their session: 

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  });
});

