const path = require('path');
const fs = require('fs-extra');
const sanitize = require('mongo-sanitize');
const GitHub = require('github-api');

const calendar = require('../../helpers/calendar.helper');
const config = require('../../config');

const Newsletter = require('../../src/components/newsletter');

const generateNewsletter = function(req, callback) {
  const saveNewsletter = sanitize(req.body.save);
	const links = sanitize(req.body.links);
	const today = new Date(Date.now());
	const week = process.env.week || calendar.getWeek(today);
	const year = process.env.year || today.getFullYear();

	const newsletter = new Newsletter(week, year, links);

	const newsletterHtml = newsletter.generate();

	if (!saveNewsletter) {
		callback.onSuccess(newsletterHtml);

		return;
	}
	
	var gh = new GitHub({
		token: process.env.GITHUB_TOKEN
 });

 const repo = gh.getRepo("dotnetweekly", "dnw-newsletter");
 repo.createBranch("master", `newsletter-${year}-${week}`).then(() => {
	repo.writeFile(
		`newsletter-${year}-${week}`,
		`public/issues/${year}/${week}/index.html`, 
		newsletterHtml,
		`Newsletter - Week: ${week} Year: ${year}`,
		{ encode: true }
	 ).then(response => {
		repo.createPullRequest({
			title: `Newsletter - Week: ${week} Year: ${year}`,
			body: `Newsletter - Week: ${week} Year: ${year}`,
			head: `newsletter-${year}-${week}`,
			base: "master"
		})
		.then()
	 })
	 .catch(error => {
		 console.log(error);
	 })
 })
};

module.exports = generateNewsletter;
