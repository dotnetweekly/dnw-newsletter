const BaseAutoBindedClass = require('../../helpers/base.autobind');
const activate = require('./activate');

class UsersHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.activate = (req, callback) => activate(req, callback);
	}
}

module.exports = UsersHandler;
