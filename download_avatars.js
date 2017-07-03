var request = require('request');
var fs = require('fs');
require('dotenv').config()

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//----------FUNCTIONS---------------

function getRepoContributors(cb) {
  var args = process.argv.slice(2);
    if (!args[0] || !args[1]) {
      throw new Error("MISSING ARGUMENT/S");
    }
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + args[0] + '/' + args[1] + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }
  request(options, function(err, response, body) {
    if (err) {
      console.log("Error fetching");
    }
    if (response.statusCode === 200) {
      var json = JSON.parse(body);
      cb(json);
    }
  })
}

//---------

function printURLs(jsonObject) {
  for (var i = 0; i < jsonObject.length; i++) {
    var avatarURLs = jsonObject[i].avatar_url;
    downloadImageByURL(avatarURLs, `./avatars/${jsonObject[i].login}.jpg`);
  }
}

//----------

function downloadImageByURL(url, filePath) {
  var options = {
    url: url,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }
  request.get(options)
         .on('response', function(response){
         response.pipe(fs.createWriteStream(filePath));
    })
}


getRepoContributors(printURLs);





