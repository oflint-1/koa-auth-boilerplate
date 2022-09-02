// Setup router
const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/auth");

// Define routes
router.get("/", (ctx, next) => {
  ctx.body = "Hello Auth!";
});
router.post("/login", Ctrl.login);
router.post("/signup", Ctrl.signup);
router.get("/status", Ctrl.status);
router.get("/logout", Ctrl.logout);

// Export router
module.exports = router.routes();
