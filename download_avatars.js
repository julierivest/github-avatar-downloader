var request = require('request');
var fs = require('fs');

var GITHUB_USER = "julierivest";
var GITHUB_TOKEN = "44a05436bb2e0a3fc2957a380376abe46655485c";




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



function printURLs(jsonObject) {

  for (var i = 0; i < jsonObject.length; i++) {
    var avatarURLs = jsonObject[i].avatar_url;
    downloadImageByURL(avatarURLs, `./${jsonObject[i].login}.jpg`);
  }
}


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





