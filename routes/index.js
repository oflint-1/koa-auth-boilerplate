// Setup basic routes
module.exports = (router) => {
  // Set prefix for all routes
  router.prefix("/api");
  // Include api routes
  router.use("", require("./api"));
};
