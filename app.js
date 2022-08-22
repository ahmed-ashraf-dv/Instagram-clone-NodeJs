require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

// mongoose
require("./mongoose");

// show imgs file
app.use(express.static(`${__dirname}/public`));

// parse application/json
app.use(bodyParser.json({ limit: "500mb" }));

// Configurations for "body-parser"
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

//cors
app.use(
  cors({
    origin: "*",
  })
);

// Routes and middleware
const routes = require("./Routes");
app.use(routes);

// Start server
app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log(`app started at http://localhost:${port}`);
});
