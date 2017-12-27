const Header = require("./header");
const Footer = require("./footer");
const ForgotPasswordContent = require("./forgotPasswordContent");

const Generator = require("../generator");
const generator = new Generator();

class ForgotPassword {
  constructor(token) {
    this.token = token;
  }

  generate() {
    const token = "";
    return generator.generate(
      [new Header(false), new ForgotPasswordContent(this.token)].concat([
        new Footer()
      ])
    );
  }
}

module.exports = ForgotPassword;
