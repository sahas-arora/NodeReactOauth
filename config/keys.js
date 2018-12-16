if (process.env.NODE_ENV === "production") {
  //automatically happens when heroku app is running
  //we are in production, return the prod set of keys

  module.exports = require("./prod");
} else {
  //we are in development, return the dev set of keys
  module.exports = require("./dev");
}
