const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');

const calendar = require('../../helpers/calendar.helper');
const config = require('../../config');

const Newsletter = require('../../src/components/newsletter');

const generateNewsletter = function(req, callback) {
	const links = sanitize(req.body.links);
	const today = new Date(Date.now());
	const week = process.env.week || calendar.getWeek(today);
	const year = process.env.year || today.getFullYear();

	const newsletter = new Newsletter(week, year, links);

	const newsletterHtml = newsletter.generate();

	callback.onSuccess(newsletterHtml);
};

module.exports = generateNewsletter;
