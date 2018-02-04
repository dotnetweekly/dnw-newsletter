const http = require("https");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path')

let clientDomain = process.env.CLIENT_DOMAIN || 'www.dotnetweekly.com';
clientDomain = clientDomain.replace("https", "").replace(/\/$/, "");

var newsletterOptions = {
  host: clientDomain,
  port: process.env.CLIENT_DOMAIN ? 443 : 443,
  path: '/newsletters',
  method: 'GET',
  strictSSL: false
};

var req = http.request(newsletterOptions, function(res) {
  let data = "";

   res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    parseNewsletters(data);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();

function parseNewsletters(data) {
  const $ = cheerio.load(data)
  $('.newsletter_link_prev').each(function(i, elem) {
    const link = $(this).attr("href");
    var myRe = /https:\/\/www\.dotnetweekly\.com\/newsletter\/show_newsletter\.php\?w=(.*?)&y=(.*?)$/gmi;
    var newsletterDates = myRe.exec(link);
    saveIssue(saveIssue, newsletterDates[1], newsletterDates[2]);
  });
}

function saveIssue(link, week, year) {

  var newsletterOption = {
    host: clientDomain,
    port: process.env.CLIENT_DOMAIN ? 443 : 443,
    path: `/newsletter\/show_newsletter\.php\?w=${week}&y=${year}`,
    method: 'GET',
    strictSSL: false
  };
  
  var req = http.request(newsletterOption, function(res) {
    let data = "";
  
     res.on('data', (chunk) => {
      data += chunk;
    });
  
    res.on('end', () => {
      saveIssueAction(link, week, year, data);
    });
  });
  
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  
  req.end();
}

function saveIssueAction(link, week, year, data){
  const folderYear = path.resolve(__dirname, `../public/issues/${year}`);
  if (!fs.existsSync(folderYear)){
      fs.mkdirSync(folderYear);
  }
  const folderWeek = path.resolve(__dirname, `../public/issues/${year}/${week}`);
  if (!fs.existsSync(folderWeek)){
      fs.mkdirSync(folderWeek);
  }

  fs.writeFile(`${folderWeek}/index.html`, data, function(err) {
    if(err) {
        return console.log(err);
    }
  });
}