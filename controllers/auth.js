// Imports
const User = require("../models/user");
const passport = require("koa-passport");
const bcrypt = require("bcryptjs");

// Login function
async function login(ctx) {
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect("/api/auth/status");
    } else {
      ctx.status = 400;
      ctx.body = { status: "error" };
    }
  })(ctx);
}

// Signup function
async function signup(ctx) {
  console.log(ctx.request.body.username);
  // Generate salt
  const salt = bcrypt.genSaltSync();
  // Generate hash using password and salt
  const hash = bcrypt.hashSync(ctx.request.body.password, salt);

  // Create new user document using username and hash
  const newUser = new User({
    username: ctx.request.body.username,
    password: hash,
  });

  // Save user to database
  const savedUser = await newUser.save().catch((err) => console.log(err));
  console.log(savedUser);

  // If user saved correctly, login user
  if (savedUser) {
    // Authenticate user
    return passport.authenticate("local", (err, user, info, status) => {
      // If user is valid
      if (user) {
        // Login user
        ctx.login(user);
        ctx.redirect("/api/auth/status");
      } else {
        // Return error
        ctx.status = 400;
        ctx.body = { status: "error" };
      }
    })(ctx);
  } else {
    // If no user returned, return a bad request
    ctx.status = 400;
  }
}

// Status function
async function status(ctx) {
  // Check whether user is authenticated
  if (ctx.isAuthenticated()) {
    ctx.body = true;
  } else {
    ctx.body = false;
  }
}

// Logout function
async function logout(ctx) {
  if (ctx.isAuthenticated()) {
    // Logout user
    ctx.logout();
    ctx.status = 200;
    ctx.body = "logged out";
  } else {
    // Throw error
    ctx.body = { success: false };
    ctx.throw(401);
  }
}

// Export functions
module.exports = {
  login,
  signup,
  status,
  logout,
};
