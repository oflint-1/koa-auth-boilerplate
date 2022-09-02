// Imports
const Koa = require("koa");
const Router = require("koa-router"); // Import routing
const bodyParser = require("koa-bodyparser"); // Imports request parser
const cors = require("@koa/cors");
const session = require("koa-session"); // Import authentication sessions
const mongoose = require("mongoose"); // Imports Mongoose which is used to link to MongoDB
const passport = require("koa-passport");

// Create a new Koa app
const app = new Koa();

// Setup default configuration
app.use(cors({ credentials: true }));
app.keys = ["super-secret-key"]; // Sets application key (Make secure for production)
app.use(session(app)); // Tells app to use sessions

// Setup authentication
require("./auth"); // Fetches auth file functinos
app.use(passport.initialize()); // Intialises passport authentication
app.use(passport.session()); // Initialises passport sessions

// Connect to database
mongoose.connect(`mongodb://database:27017/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Connects to database
var db = mongoose.connection; // Stores connection
db.on("error", console.error.bind(console, "connection error:")); // Logs any errors

// Initialise request parser
app.use(bodyParser());

// Add routes
const router = new Router(); // Create new router
require("./routes")(router); // Require external routes and pass in the router
app.use(router.routes()); // Use all routes
app.use(router.allowedMethods()); // Setup allowed methods

// Listen on port 3000
app.listen(3000);
