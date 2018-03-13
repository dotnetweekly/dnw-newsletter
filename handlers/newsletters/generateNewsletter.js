const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');
const GitHub = require('github-api');

const cssHelper = require('../../helpers/css.helper');
const calendar = require('../../helpers/calendar.helper');
const config = require('../../config');
const Newsletter = require('../../src/components/newsletter');

const generateNewsletter = function(req, callback) {
	const saveNewsletter = sanitize(req.body.save);
	const links = sanitize(req.body.links);
	let week = sanitize(req.query.week);
	let year = sanitize(req.query.year);

	const today = calendar.getUtcNow();
	week = week || calendar.getWeek(today) - 1;
	year = year || today.getFullYear();

	const newsletter = new Newsletter(week, year, links);

	const newsletterHtml = newsletter.generate();

	cssHelper
		.inlineCssInHtml(newsletterHtml)
		.then(inlinedHtml => {
			if (!saveNewsletter) {
				callback.onSuccess(inlinedHtml);

				return;
			}

			var gh = new GitHub({
				token: process.env.GITHUB_TOKEN
			});

			const repo = gh.getRepo('dotnetweekly', 'dnw-newsletter');
			repo.createBranch('master', `newsletter-${year}-${week}`).then(() => {
				repo
					.writeFile(
						`newsletter-${year}-${week}`,
						`public/issues/${year}/${week}/index.html`,
						inlinedHtml,
						`Newsletter - Week: ${week} Year: ${year}`,
						{ encode: true }
					)
					.then(response => {
						repo
							.createPullRequest({
								title: `Newsletter - Week: ${week} Year: ${year}`,
								body: `Newsletter - Week: ${week} Year: ${year}`,
								head: `newsletter-${year}-${week}`,
								base: 'master'
							})
							.then(() => {
								callback.onSuccess();
							});
					})
					.catch(error => {
						console.log(error);
					});
			});
		})
		.catch(error => {
			console.log(error);
			callback.onSuccess('');
		});
};

module.exports = generateNewsletter;
