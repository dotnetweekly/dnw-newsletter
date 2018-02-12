const path = require('path');
const fs = require('fs-extra');
const newsletterCache = require('../../helpers/newsletters.helper');

const getNewsletterList = function(req, callback) {
  const newsletterList = newsletterCache.get();
  callback.onSuccess(newsletterList);
};

module.exports = getNewsletterList;
