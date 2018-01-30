const path = require("path");
const fs = require("fs-extra");
const sanitize = require('mongo-sanitize');

const config = require("../../config");

const ForgotPassword = require("../../src/components/forgotPassword");

const forgotPassword = function(req, callback) {
  const token = sanitize(req.query.token);
  const email = new ForgotPassword(token);

  const emailHtml = email.generate();

  callback.onSuccess(emailHtml);
};

module.exports = forgotPassword;
