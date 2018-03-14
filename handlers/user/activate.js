const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');
const Inky = require('inky').Inky;

const cssHelper = require('../../helpers/css.helper');
const config = require('../../config');

const ActivateAccount = require('../../src/components/activateAccount');

const activate = function(req, callback) {
	const token = sanitize(req.query.token);
	const password = sanitize(req.query.password);

	const email = new ActivateAccount(token, password);

	const emailHtml = email.generate();
	const i = new Inky({});
	const convertedHtml = i.releaseTheKraken(emailHtml);

	cssHelper
		.inlineCssInHtml(convertedHtml)
		.then(inlinedHtml => {
			callback.onSuccess(inlinedHtml);
		})
		.catch(error => {
			console.log(error);
			callback.onSuccess('');
		});
};

module.exports = activate;
