let express = require("express");
let mongoose = require("mongoose");
let cookieSession = require("cookie-session");
let passport = require("passport");
let keys = require("./config/keys");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

let app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //The maxAge property states the amount of time we want the cookie to exist in our browser before it expires. In our case, we want the cookie to last for 30 days.
    keys: [keys.cookieKey] //This property encrypts our cookie for security.
  })
);

app.use(passport.initialize());
app.use(passport.session());

let authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000; //environment variables.

authRoutes(app);
app.listen(PORT);
console.log("Your application is running on port number:", PORT);
