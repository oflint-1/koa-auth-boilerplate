// Import and create router
const Router = require("koa-router");
const router = new Router();

// GET basic route
router.get("/", (ctx, next) => {
  ctx.body = "Hello Api!";
});

// Add subroutes to main router
router.use("/auth", require("./auth"));

// Export router
module.exports = router.routes();
