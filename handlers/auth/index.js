const BaseAutoBindedClass = require('../../helpers/base.autobind');
const validate = require('./validate');

class AuthHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.validate = (req, callback) => validate(req, callback);
	}
}

module.exports = AuthHandler;
