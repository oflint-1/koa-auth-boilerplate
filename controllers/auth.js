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

async function signup(ctx) {
  console.log(ctx.request.body.username);
  // generate salt
  const salt = bcrypt.genSaltSync();
  // generate hash using password and salt
  const hash = bcrypt.hashSync(ctx.request.body.password, salt);

  // create new user document using username and hash
  const newUser = new User({
    username: ctx.request.body.username,
    password: hash,
  });

  // save user to database
  const savedUser = await newUser.save().catch((err) => console.log(err));
  console.log(savedUser);

  //If user saved correctly, login user
  if (savedUser) {
    // authenticate user
    return passport.authenticate("local", (err, user, info, status) => {
      // if user is valid
      if (user) {
        // login user
        ctx.login(user);
        // redirect to status
        ctx.redirect("/api/auth/status");
      } else {
        // set status to 400
        ctx.status = 400;
        // return error
        ctx.body = { status: "error" };
      }
    })(ctx);
  } else {
    // if no user returned, return a 400 error (bad request)
    ctx.status = 400;
  }
}

async function status(ctx) {
  console.log(ctx.isAuthenticated());
  if (ctx.isAuthenticated()) {
    ctx.body = true;
  } else {
    ctx.body = false;
  }
}
async function logout(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 200;
    ctx.body = "logged out";
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
}
module.exports = {
  login,
  signup,
  status,
  logout,
};
