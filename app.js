/** Express app for Lunchly. */

const express = require("express");
const nunjucks = require("nunjucks");
// const bodyParser = require("body-parser"); DONT NEED THIS ANYMORE 
const routes = require("./routes");

const app = express();
//Serve static Fiels From Public directory
app.use(express.static('public'));
// Parse body for urlencoded (non-JSON) data
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//app.set('view engine', 'njk'); // set the view engine to Nunjucks DO WE NEED THIS LINE?
nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.use(routes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});

module.exports = app;
