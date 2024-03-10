/*
I can show you how to add basic authentication and authorization to your Express.js application using Passport.js, a popular middleware for Node.js.

First, install the necessary packages by running==>>> npm install passport passport-local bcryptjs express-session connect-mongo <<<in your project directory.
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db');

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.connect().then(database => {
      database.collection('users').findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, {message: 'Incorrect password'})
          }
        })
      });
    }).catch(err => {
      return done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.connect().then(database => {
    database.collection('users').findOne({ _id: id }, function(err, user) {
      done(err, user);
    });
  }).catch(err => {
    done(err);
  });
});

/*
In this setup, Passport.js is used for authentication, and bcryptjs is used for password hashing. 
The express-session and connect-mongo packages are used to handle sessions, which are necessary for persistent login sessions.

The SESSION_SECRET environment variable is used as the secret for the session. This should be a long, unguessable string.
*/
