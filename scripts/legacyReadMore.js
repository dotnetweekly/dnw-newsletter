const http = require("https");
var request = require('request');
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path')
const recursive = require('recursive-readdir')

const folderIssue = path.resolve(__dirname, `../public/issues/`);
const includedFilesRegExp = ['(.*?[\\/|\\\\]index\\.html)']
const newDomain = "https://dnw-newsletter.azurewebsites.net/";
const oldHost = "www.dotnetweekly.com"

var assetFiles = [];

var setFiles = new Promise((resolve, reject) => {
  recursive(folderIssue, (err, files) => {
    files.forEach(file => {
      var fileName = file.replace(folderIssue, '');
      if (fileName.match(includedFilesRegExp)) {
        assetFiles.push(file);
      }
    })
    resolve();
  });
});

setFiles.then(() => {
  assetFiles.forEach(file => {
    fs.readFile(file, "utf-8", function(err, data){

      let newData = data.replace(/\r\n/, "");
      newData = newData.replace(/\n/, "");
      var myRe = /https:\/\/www\.dotnetweekly\.com\/newsletter\/show_newsletter\.php\?week=[0-9]*&year=[0-9]*/gmi;
      var resourceLinks = newData.match(myRe);

      if (resourceLinks) {
        resourceLinks.forEach(resourceLink => {
          var filename = (/https:\/\/www\.dotnetweekly\.com\/newsletter\/show_newsletter\.php\?week=(.*?)&year=(.*?)$/g).exec(resourceLink);
          const year = parseInt(filename[2]);
          const week = parseInt(filename[1]);
          newResourceLink = `https://dnw-newsletter.azurewebsites.net/issues/${year}/${week}/`;
          data = data.replace(resourceLink, newResourceLink);
          saveNewFile(file, data);
        })
      }
    });
  })
})

function saveNewFile(filename, data) {
  fs.writeFileSync(filename, data, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}
