module.exports = (router) => {
  router.prefix("/api");
  router.use("", require("./api"));
};
