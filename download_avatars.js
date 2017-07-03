var request = require('request');

var GITHUB_USER = "julierivest";
var GITHUB_TOKEN = "44a05436bb2e0a3fc2957a380376abe46655485c";




function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

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
  console.log(jsonObject);
  for (var i = 0; i < jsonObject.length; i++) {
    var avatarURLs = jsonObject[i].avatar_url;
    console.log(avatarURLs);
  }
}



getRepoContributors("jquery", "jquery", printURLs);





