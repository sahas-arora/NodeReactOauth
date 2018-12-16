let passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //Here, the string 'google' is just to specify to passport the stratergy that it needs to use, which in our case, is GoogleStratergy.
      scope: ["profile", "email"] //scope specifies to the google servers that we need access to the user's profile and email.
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (request, response) => {
    request.logout(); //This function takes the cookie in the browser and kills it, basically logs out from the browser.
    response.send(request.user);
  });

  app.get("/api/current_user", (request, response) => {
    response.send(request.user);
  });
};
