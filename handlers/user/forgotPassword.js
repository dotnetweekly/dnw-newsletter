const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');

const cssHelper = require('../../helpers/css.helper');
const config = require('../../config');

const ForgotPassword = require('../../src/components/forgotPassword');

const forgotPassword = function(req, callback) {
	const token = sanitize(req.query.token);
	const email = new ForgotPassword(token);

	const emailHtml = email.generate();
	cssHelper
		.inlineCssInHtml(emailHtml)
		.then(inlinedHtml => {
			callback.onSuccess(inlinedHtml);
		})
		.catch(() => {
			callback.onSuccess('');
		});
};

module.exports = forgotPassword;
