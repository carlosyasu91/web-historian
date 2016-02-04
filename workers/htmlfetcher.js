// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

exports.downloadWebsites = function(){
  archive.readListOfUrls(function(array) {
    console.log('arrayyyyyyyyy: ', array);
    archive.downloadUrls(array);
  });
};

exports.downloadWebsites();
