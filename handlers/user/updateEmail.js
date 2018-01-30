const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');

const config = require('../../config');

const UpdateEmail = require('../../src/components/updateEmail');

const activate = function(req, callback) {
	const token = sanitize(req.query.token);
	const email = new UpdateEmail(token);

	const emailHtml = email.generate();

	callback.onSuccess(emailHtml);
}

module.exports = activate;
