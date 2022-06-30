const Koa = require("koa"); // Imports Koa
const Router = require("koa-router"); // Imports Koa-router which allows for routing
const mongoose = require("mongoose"); // Imports Mongoose which is used to link to MongoDB
const bodyParser = require("koa-bodyparser"); // Imports Koa-bodyparser which is used to parse requests
const cors = require("@koa/cors");

const session = require("koa-session"); // Imports Koa-session which allows for authentication sessions
const passport = require("koa-passport"); // Imports Koa-passport which allows passport authentication to work with koa

const app = new Koa(); // Creates new Koa app

app.use(cors({ credentials: true }));

app.keys = ["super-secret-key"]; // Sets application key (will be secure if used in production)
app.use(session(app)); // Tells app to use sessions

// authentication
require("./auth"); // Fetches auth file functinos
app.use(passport.initialize()); // Intialiases passport authentication
app.use(passport.session()); // Initialises passport sessions

mongoose.connect(`mongodb://database:27017/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Connects to database
var db = mongoose.connection; // Stores connection
db.on("error", console.error.bind(console, "connection error:")); // Logs any errors

app.use(bodyParser()); // Initialises request parser

const router = new Router(); // Create new router

require("./routes")(router); // Require external routes and pass in the router

app.use(router.routes()); // tells router to use all the routes that are on the object
app.use(router.allowedMethods()); // more setup for router

module.exports = app; // exports application (used for testing)

app.listen(3000); // tell the server to listen to events on port 3000 if in development
