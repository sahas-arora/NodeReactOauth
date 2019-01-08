let keys = require("../config/keys");
let stripe = require("stripe")(keys.stripeSecretKey);
let requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (request, response) => {
    console.log("The request body is: ", request.body);

    let charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: request.body.id
    });

    console.log("The charge is: ", charge);

    request.user.credits += 5;
    let user = await request.user.save();

    response.send(user);
  });
};
