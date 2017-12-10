const apiDomain = 'http://localhost:3000/api/v1/';
const newsletterDomain = 'http://localhost:6100/';
const clientDomain = 'http://localhost:5000/';

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
