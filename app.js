require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const path = require("path");

// mongoose
require("./mongoose");

// show imgs file
app.use(express.static(`${__dirname}/public`));

// parse application/json
app.use(bodyParser.json());

// Configurations for "body-parser"
app.use(bodyParser.urlencoded({ extended: true }));

// Routes and middleware
const routes = require("./Routes");
app.use(routes);

// Start server
app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log(`app started at http://localhost:${port}`);
});
