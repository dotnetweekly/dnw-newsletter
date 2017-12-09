const path = require('path');
const port = process.env.PORT || 6100;
const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'));

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
