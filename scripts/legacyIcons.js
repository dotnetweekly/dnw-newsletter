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
      
      var myRe = /https:\/\/dnw-newsletter\.azurewebsites\.net\/images\/legacy\/(.*?)\"/gmi;
      var resourceLinks = newData.match(myRe);

      if (resourceLinks) {
        resourceLinks.forEach(resourceLink => {
          resourceLink = resourceLink.replace(/\"$/, "");
          saveResource(resourceLink);
          // data = data.replace(resourceLink, 
          //   resourceLink.replace(
          //     "https://dotnetweekly.com/newsletter/images", 
          //     `${newDomain}images/legacy`
          //  )
          // );
          // saveNewFile(file, data);
        })
      }
    });
  })
})

function saveResource(url) {
  return new Promise((resolve, reject) => {

    var filename = (/\/images\/legacy\/(.*?)$/g).exec(url);
    const fileFilename = filename[1];

    const folderWeek = path.resolve(__dirname, `../public/images/legacy/`);
    if (fs.existsSync(`${folderWeek}/${fileFilename}`)) {
      resolve();
      console.log("exists...", `${folderWeek}/${fileFilename}`);
      return;
    }

    url = url.replace("https://dnw-newsletter.azurewebsites.net/images/legacy/",
  "https://www.dotnetweekly.com/newsletter/images/");

    request.get({url, encoding: "binary"}, function(err, res, body) {
      saveResourceFile(fileFilename, body);
    });
  })
}

function saveResourceFile(filename, data){
  const folderWeek = path.resolve(__dirname, `../public/images/legacy/`);
  if (!fs.existsSync(`${folderWeek}/${filename}`)) {
    fs.writeFileSync(`${folderWeek}/${filename}`, data, 'binary', function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

function saveNewFile(filename, data) {
  fs.writeFileSync(filename, data, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}
