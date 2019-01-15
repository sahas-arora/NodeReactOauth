let mongoose = require("mongoose");
let _ = require("lodash");
let Path = require("path-parser").default;
let { URL } = require("url");

let requireLogin = require("../middlewares/requireLogin");
let requireCredits = require("../middlewares/requireCredits");
let Mailer = require("../services/Mailer");
let surveyTemplate = require("../services/emailTemplates/surveyTemplate");

let Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (request, response) => {
    //The request.user is the current user.
    let surveyList = await Survey.find({
      _user: request.user.id
    }).select({
      recipients: false
    });

    response.send(surveyList);
  });

  app.get("/api/surveys/:surveyId/:choice", (request, response) => {
    response.send("Thank you for voting!!");
  });

  app.post("/api/surveys/webhooks", (request, response) => {
    let parserObject = new Path("/api/surveys/:surveyId/:choice");

    _.chain(request.body)
      .map(event => {
        let pathName = new URL(event.url).pathname; //This line of code extracts only the /api/surveys/:surveyId/:yesORno from the object that we get back from localtunnel/sendGrid.
        let match = parserObject.test(pathName);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact() //The compact() lodash function removes any undefined elements from the events object.
      .uniqBy("email", "surveyId")
      .each(event => {
        Survey.updateOne(
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: { email: event.email, responded: false }
            } //The $elemMatch finds the one recipient sub-document collection that we care about at that moment(since there are a lot of recipients in that Survey).
            //Everything before the comma represents the Survey recipient that we want to find and after the comma represents the update that we want to give to the found Survey recipient.
          },
          {
            $inc: { [event.choice]: 1 }, //The [choice] represents either a "yes" or "no".
            $set: { "recipients.$.responded": true }, //The $ in the recipients.$.responded query represents that one recipient that we found using $elemMatch, and updates their responded property to true.
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    //The uniqBy() lodash function removes any duplicate properties from an object.
    //The fist argument is the object that we want to iterate over, the second and third arguments are the properties that we want the function to check.
    response.send({});
  });

  //The middlewares that we have added in the post request below (requireLogin, requireCredits), we can add as many number of middlewares that we want, but the order in which we enter them is important.
  //Since we want to see whether the user is logged in first before checking whether the user has enough number of credits or no, we run the requireLogin middleware before the requireCredits one.
  app.post(
    "/api/surveys",
    requireLogin,
    requireCredits,
    async (request, response) => {
      let { title, subject, body, recipients } = request.body;
      // let title = request.body.title;
      // let subject = request.body.subject;
      // let body = request.body.body;
      // let recipients = request.body.recipients;

      let survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map(email => {
          return { email: email.trim() };
        }),
        _user: request.user.id,
        dateSent: Date.now()
      });

      let mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        request.user.credits -= 1;
        let user = await request.user.save();

        response.send(user);
      } catch (error) {
        response.send(422).send(error);
      }
    }
  );
};
