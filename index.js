let express = require("express");
let mongoose = require("mongoose");
let cookieSession = require("cookie-session");
let passport = require("passport");
let bodyParser = require("body-parser");
let keys = require("./config/keys");

require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

let app = express();

app.use(bodyParser.json());

app.use(
  //Express middlewares are used through these kind of functions.
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //The maxAge property states the amount of time we want the cookie to exist in our browser before it expires. In our case, we want the cookie to last for 30 days.
    keys: [keys.cookieKey] //This property encrypts our cookie for security.
  })
);

app.use(passport.initialize());
app.use(passport.session());

let authRoutes = require("./routes/authRoutes");
let billingRoutes = require("./routes/billingRoutes");
let surveyRoutes = require("./routes/surveyRoutes");

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); //This line of code indicates that Express will serve up the production assets
  //Like the main.js or the main.css file that gets generated when we run npm run build.

  let path = require("path"); //Here, we basically tell Express that use the index.html file when you encounter a route that you do not recognize.
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; //environment variables.

app.listen(PORT);
console.log("Your application is running on port number:", PORT);
