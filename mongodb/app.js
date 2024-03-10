const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const db = require('./db');
require('./auth');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.MONGODB_URL })
}));
app.use(passport.initialize());
app.use(passport.session());

db.connect().then((database) => {
  // Now you can use the `database` object to interact with your database
  // Routes --Authentication
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });
  
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  
  // GET request
  app.get('/data', (req, res) => {
    database.collection('data').find({}).toArray((err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });

  // POST request
  app.post('/data', (req, res) => {
    const data = { text: req.body.body, title: req.body.title };
    database.collection('data').insert(data, (err, result) => {
      if (err) { 
        res.send({ error: 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.listen(8000, () => {
    console.log('Listening on port 8000');
  });
}).catch((err) => {
  console.error("Failed to connect to db", err);
});
