# Koa Authenticated API Boilerplate
Boilerplate for a KoaJS API with authentication built in. This can be used as the basis for a fully fledged API.

## Adding routes
Add a new files in /routes and add it to /routes/api.js:
```
router.use("/path", require("./file"));
```
You can then write controllers and import them into the new routes from /controllers.

## Adding models
Simply add a new mongoose model into /models and import and use it anywhere within the application.