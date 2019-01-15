const regularExpression = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  let invalidEmails = emails
    .split(",") //splits all the emails that a user enters in the recipients field of the form.
    //The emails, seperated by a comma, are then put into an array.
    .map(email => email.trim()) //Mapping over the newly formed array with all the emails, any whitespaces after the comma is removed.
    .filter(email => regularExpression.test(email) === false && email !== ""); //since we only want the emails that are not valid, this function will return any email that is faulty.

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
