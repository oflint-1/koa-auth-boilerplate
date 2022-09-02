// Imports
const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy; // Import strategy
const User = require("./models/user"); // Get user model
const bcrypt = require("bcryptjs"); // Used to encrypt passwords

const options = {};

// Utility functions for user serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Setup authentication
passport.use(
  new LocalStrategy(options, (username, password, done) => {
    // Get user from database
    User.findOne({ username: username }, (err, user) => {
      if (!user) return done(null, false);
      // Compare passwords
      if (comparePass(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Utility function to compare passwords with hashed versions
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
