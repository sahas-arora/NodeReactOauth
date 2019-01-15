module.exports = (request, response, next) => {
  if (request.user.credits < 1) {
    return response
      .status(403)
      .send({ error: "Kindly add more credits to your account to proceed." });
  }

  next();
};
