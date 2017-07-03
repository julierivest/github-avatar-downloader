var request = require('request');

var GITHUB_USER = "Yjulierivest";
var GITHUB_TOKEN = "44a05436bb2e0a3fc2957a380376abe46655485c";




function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //console.log(requestURL);

  var options = {
  url: requestURL,
  headers: {
    'User-Agent': 'GitHub Avatar Downloader - Student Project'
  }
};

  request(options, cb);


}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result.body);

});

