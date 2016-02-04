var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  index: path.join(__dirname, '../web/public/index.html'),
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readListOfUrls = function(callback) {
    fs.readFile(exports.paths.list, function(err, data) {
      if (err) throw err;
      var array = data.toString().split('\n');
      callback(array);
    });  
};

exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls(function(array){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        callback(true);
      } 
    }
    callback(false);
  });
};

exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls(function(array){
    array.push(url);
    fs.writeFile(exports.paths.list, array.join('\n'), function(err, data) {
      if (err) throw err;
      callback(true);
    });
  });
  callback(false);
};

exports.isUrlArchived = function(url, callback) {
  var filePath = path.join(__dirname, '../test/testdata/sites/' + url);
  console.log('Filepath: ' + filePath);
  fs.readFile(filePath, 'utf8', callback);
};

exports.downloadUrls = function() {
};
