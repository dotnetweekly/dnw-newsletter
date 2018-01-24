const path = require("path");
const fs = require("fs-extra");
const config = require("../../config");
const dateHelper = require("../../helpers/date.helper");
const linkHelper = require("../../helpers/link.helper");

class Link {
  constructor(link) {
    this.link = link;
  }

  generate() {
    let linkTmpl = fs.readFileSync(
      path.resolve(__dirname, "../../template/link.html"),
      "utf-8"
    );
    linkTmpl = linkTmpl.replace(/(\${linkTitle})/gim, this.link.title);
    linkTmpl = linkTmpl.replace(/(\${linkResource})/gim, this.link.url);
    linkTmpl = linkTmpl.replace(
      /(\${linkUpvotes})/gim,
      this.link.upvotes.length
    );
    linkTmpl = linkTmpl.replace(
      /(\${linkDate})/gim,
      dateHelper.formatDate(this.link.createdOn)
    );
    linkTmpl = linkTmpl.replace(
      /(\${linkRoot})/gim,
      linkHelper.extractRootDomain(this.link.url)
    );
    linkTmpl = linkTmpl.replace(/(\${username})/gim, this.link.user.username);
    linkTmpl = linkTmpl.replace(
      /(\${linkUrl})/gim,
      `${config.clientDomain}${this.link.category.slug}/${this.link.slug}`
    );

    const categorySlug = this.link.category.slug;
    let imageUrl = `${config.newsletterDomain}images/`;
    switch (categorySlug) {
      case "articles":
        imageUrl += "article.png";
        break;
      case "books":
        imageUrl += "book.png";
        break;
      case "events-training":
        imageUrl += "training.png";
        break;
      case "libraries-tools":
        imageUrl += "tool.png";
        break;
      case "videos":
        imageUrl += "video.png";
        break;
    }

    linkTmpl = linkTmpl.replace(/(\${linkCategoryImage})/gim, imageUrl);
    return linkTmpl;
  }
}

module.exports = Link;
