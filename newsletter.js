const path = require('path');
const fs = require('fs-extra');

const calendar = require('./helpers/calendar.helper');
const config = require('./config');

const today = new Date(Date.now());
const week = process.env.week || calendar.getWeek(today);
const year = process.env.year || today.getFullYear();

const { replaceColors } = require('./scripts/colors');

async function getMain() {
	return await fs.readFile(path.resolve(__dirname, './template/main.html'), 'utf-8');
}

function getHeader() {
	return fs.readFileSync(path.resolve(__dirname, './template/header.html'), 'utf-8');
}

function getLink() {
	return fs.readFileSync(path.resolve(__dirname, './template/link.html'), 'utf-8');
}

function getFooter() {
	return fs.readFileSync(path.resolve(__dirname, './template/footer.html'), 'utf-8');
}

async function getStyles() {
	return await fs.readFile(path.resolve(__dirname, './public/styles.css'), 'utf-8');
}

async function saveFolder() {
	if (!fs.existsSync(path.resolve(__dirname, `./public/issues/${year}`))) {
		fs.mkdirSync(path.resolve(__dirname, `./public/issues/${year}`));
	}
}

async function saveNewsletter(newsletter) {
	const newsletterFile = path.resolve(__dirname, `./public/issues/${year}/${week}.html`);
	if (fs.existsSync(newsletterFile)) {
		fs.unlinkSync(newsletterFile);
	}
	return await fs.writeFile(newsletterFile, newsletter, 'utf8');
}

async function generateNewsletter() {
	let main = await getMain();
	let header = getHeader();
	let footer = getFooter();
	let link = getLink();
	const styles = await getStyles();

	main = main.replace('{{ STYLE }}', styles);
	main = main.replace('{{ HEADER }}', header);
	main = main.replace('{{ BODY }}', link + link + link + link + link);
	main = main.replace('{{ FOOTER }}', footer);

	main = await replaceColors(main);

	saveFolder();
	return await saveNewsletter(main);
}

try {
	generateNewsletter();
} catch (ex) {
	console.log(ex);
}
