const http = require("https");
var request = require('request');
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path')
const recursive = require('recursive-readdir')

const folderIssue = path.resolve(__dirname, `../public/issues/`);
const includedFilesRegExp = ['(.*?[\\/|\\\\]index\\.html)']
const newDomain = "https://dnw-newsletter.scm.azurewebsites.net/";
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

      fixWeekNumber(file, data);

      // let newData = data.replace(/\r\n/, "");
      // newData = newData.replace(/\n/, "");
      
      // var myRe = /https:\/\/www.dotnetweekly.com\/wp-content\/(.*?)\"/gmi;
      // var resourceLinks = newData.match(myRe);

      // if (resourceLinks) {
      //   resourceLinks.forEach(resourceLink => {
      //     resourceLink = resourceLink.replace(/\"$/, "");
      //     saveResource(resourceLink);
      //     data = data.replace(resourceLink, 
      //       resourceLink.replace(
      //         "https://www.dotnetweekly.com/wp-content/uploads", 
      //         `${newDomain}issues`
      //      )
      //     );
      //     saveNewFile(file, data);
      //   })
      // }
    });
  })
})

function saveResource(url) {
  return new Promise((resolve, reject) => {

    var filename = (/\/uploads\/(.*?)\/(.*?)\/(.*?)$/g).exec(url);
    const year = parseInt(filename[1]);
    const week = parseInt(filename[2]);
    const fileFilename = filename[3];

    const folderWeek = path.resolve(__dirname, `../public/issues/${parseInt(year)}/${parseInt(week)}`);
    if (fs.existsSync(`${folderWeek}/${fileFilename}`)) {
      resolve();
    }

    var resourceOptions = {
      host: oldHost,
      port: 443,
      path: url.replace(`https://${oldHost}`, ""),
      method: 'GET',
      strictSSL: false
    };
    request.get({url, encoding: "binary"}, function(err, res, body) {
      saveResourceFile(year, week, fileFilename, body);
    });
  })
}

function saveResourceFile(year, week, filename, data){
  const folderWeek = path.resolve(__dirname, `../public/issues/${parseInt(year)}/${parseInt(week)}`);
  if (!fs.existsSync(`${folderWeek}/${filename}`)) {
    fs.writeFileSync(`${folderWeek}/${filename}`, data, 'binary', function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

function fixWeekNumber(filename, data) {
  let newData = data.replace(/\r\n/, "");
  newData = newData.replace(/\n/, "");
  
  var myRe = /https:\/\/dnw-newsletter\.scm\.azurewebsites\.net\/issues\/(.*?)\/(.*?)\/(.*?)/gmi;
  var resourceLinks = newData.match(myRe);

  if (!resourceLinks) {
    return data;
  }

  let found = 0;

  resourceLinks.forEach(resourceLink => {
    var linkParts = (/\/issues\/(.*?)\/(.*?)\/(.*?)$/g).exec(resourceLink);
    var reg1 = new RegExp(`/issues/${linkParts[1]}/${linkParts[2]}/`, "gmi");
    data = data.replace(reg1, `/issues/${linkParts[1]}/${parseInt(linkParts[2]).toString()}/`)
  })
  
  fs.writeFileSync(filename, data, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

function saveNewFile(filename, data) {
  fs.writeFileSync(filename, data, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}
