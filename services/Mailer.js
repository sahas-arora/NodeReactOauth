let sendGrid = require("sendgrid");
let helper = sendGrid.mail; //This helps us create the helper.
let keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sendGridAPI = sendGrid(keys.sendGridKey);

    this.from_email = new helper.Email("no-reply@nodereactoauth.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //helper function
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    let trackingSettings = new helper.TrackingSettings();
    let clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    let personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  async send() {
    let request = this.sendGridAPI.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    let response = await this.sendGridAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
