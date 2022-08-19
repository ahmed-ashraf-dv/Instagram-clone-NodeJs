const mongoose = require("mongoose");
const keys = require("./keys");

const uri = `mongodb+srv://${keys.username}:${keys.password}@${keys.mongoDb}.1ec8y.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(async () => {
    console.log("mongoose connection");
  })
  .catch((err) => {
    console.error(err);
  });
