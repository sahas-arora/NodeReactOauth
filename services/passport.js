let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy;
let keys = require("../config/keys");
let mongoose = require("mongoose");

let User = mongoose.model("users"); //One argument, hence we're requiring something from our mongoose library.

passport.serializeUser((user, done) => {
  done(null, user.id); //The user.id here is the unique ID assigned to the user in our MongoDB users collection. This is not the same as the googleID property of the user.
}); //This entire function basicallly assigns a unique browser cookie to a user.

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
}); //This entire function makes a model instance of the user who was assigned the unique cookie in the previous step.

passport.use(
  new GoogleStrategy(
    //clientID is the public token that can be shared with the public.
    //client-secret is a private token that shouldn't be shared whatsoever.
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("The access token is: ", accessToken);
      console.log("The refresh token is:", refreshToken);
      console.log("The profile:", profile);

      User.findOne({ googleID: profile.id }) //This is an asynchronous action. This query returns a promise, which is a data structure to handle asynchronous requests.
        .then(existingUser => {
          if (existingUser) {
            console.log("The user already exists.");
            done(null, existingUser);
          } else {
            new User({
              googleID: profile.id
            })
              .save()
              .then(user => {
                console.log("New user added.");
                done(null, user);
              }); //The .save() function saves our model instance from our express server into our MongoDB databse.
          }
        });
    }
  )
); //Creates a new instance of the Google passport stratergy.
