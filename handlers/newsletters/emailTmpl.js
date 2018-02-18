const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');
const GitHub = require('github-api');

const config = require('../../config');
const EmailTmpl = require('../../src/components/emailTmpl');

const emailTmplModule = function(req, callback) {
  const header = sanitize(req.query.header);
  const actionName = sanitize(req.query.actionName);
  const actionUrl = sanitize(req.query.actionUrl);
  const content = sanitize(req.query.content);
  
	const emailTmpl = new EmailTmpl(header, actionName, actionUrl, content);
	const emailHtml = emailTmpl.generate();

  callback.onSuccess(emailHtml);
  return;
};

module.exports = emailTmplModule;
