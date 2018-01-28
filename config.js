const apiDomain = process.env.API_DOMAIN || 'http://localhost:3000/api/v1/';
const newsletterDomain = process.env.NEWSLETTER_DOMAIN || 'http://localhost:6100/';
const clientDomain = process.env.CLIENT_DOMAIN || 'http://localhost:5000/';

const config = {
	clientDomain: clientDomain,
	newsletterDomain: newsletterDomain,
	api: {
		domain: apiDomain,
		links: `${apiDomain}links`
	},
	auth: {
		secret: 'secret'
	}
};

module.exports = config;
