const Router = require("koa-router");
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Hello Api!";
});

// Add subroutes to main router
router.use("/auth", require("./auth"));

module.exports = router.routes();
