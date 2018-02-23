const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');

const config = require('../../config');

const ActivateAccount = require('../../src/components/activateAccount');

const activate = function(req, callback) {
	const token = sanitize(req.query.token);
	const password = sanitize(req.query.password);

	const email = new ActivateAccount(token, password);

	const emailHtml = email.generate();

	callback.onSuccess(emailHtml);
}

module.exports = activate;
