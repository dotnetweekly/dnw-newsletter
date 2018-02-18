const path = require("path");
const fs = require("fs-extra");
const config = require("../../config");

class Content {
  constructor(header, actionName, actionUrl, content) {
    this.content = content;
    this.header = header;
    this.actionHeader = actionName;
    this.actionUrl = actionUrl;
  }

  generate() {
    let tmpl = fs.readFileSync(
      path.resolve(__dirname, "../../template/contentContainer.html"),
      "utf-8"
    );

    let contentTmpl = "";
    let headerTmpl = "";
    let actionTmpl = "";

    if (this.content) {
      contentTmpl = fs.readFileSync(
      path.resolve(__dirname, "../../template/content.html"),
        "utf-8"
      );
      contentTmpl = contentTmpl.replace(/(\${content})/gim, this.content);
    }

    if (this.header) {
      headerTmpl = fs.readFileSync(
        path.resolve(__dirname, "../../template/contentHeader.html"),
        "utf-8"
      );
  
      headerTmpl = headerTmpl.replace(/(\${contentHeader})/gim, this.header);
    }

    if (this.actionHeader && this.actionUrl) {
      actionTmpl = fs.readFileSync(
        path.resolve(__dirname, "../../template/action.html"),
        "utf-8"
      );
  
      actionTmpl = actionTmpl.replace(/(\${actionHeader})/gim, this.actionHeader);
      actionTmpl = actionTmpl.replace(/(\${actionUrl})/gim, this.actionUrl);
    }

    tmpl = tmpl.replace(/(\${CONTAINER_HEADER})/gim, headerTmpl);
    tmpl = tmpl.replace(/(\${CONTAINER_CONTENT})/gim, contentTmpl);
    tmpl = tmpl.replace(/(\${CONTAINER_ACTION})/gim, actionTmpl);
    
    return tmpl;
  }
}

module.exports = Content;
