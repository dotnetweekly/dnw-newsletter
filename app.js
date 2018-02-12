const express = require('express');
const sanitize = require('mongo-sanitize');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');
const newsletterCache = require('./helpers/newsletters.helper');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function allowCrossDomain(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

	const origin = sanitize(req.headers.origin);
	if (origin) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');

	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
}

app.use(allowCrossDomain);

app.use('/', express.static(__dirname + '/public'));
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500).send({
		success: false,
		message: err.message
	});
});

newsletterCache.refresh();

module.exports = app;
