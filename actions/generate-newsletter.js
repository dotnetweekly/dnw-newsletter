const path = require('path');
const fs = require('fs-extra');

const calendar = require('../helpers/calendar.helper');
const config = require('../config');

const Newsletter = require('../src/components/newsletter');

const today = new Date(Date.now());
const week = process.env.week || calendar.getWeek(today);
const year = process.env.year || today.getFullYear();

const newsletter = new Newsletter(week, year);

function saveFolder() {
	if (!fs.existsSync(path.resolve(__dirname, `../public/issues/${year}`))) {
		fs.mkdirSync(path.resolve(__dirname, `../public/issues/${year}`));
	}
}

function saveNewsletter(newsletterHtml) {
	const newsletterFile = path.resolve(__dirname, `../public/issues/${year}/${week}.html`);
	if (fs.existsSync(newsletterFile)) {
		fs.unlinkSync(newsletterFile);
	}
	fs.writeFileSync(newsletterFile, newsletterHtml, 'utf8');
}

const newsletterHtml = newsletter.generate();

saveFolder();
saveNewsletter(newsletterHtml);
