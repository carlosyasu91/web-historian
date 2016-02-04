var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
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
      console.log(data.toString());
      var array = data.toString().split('\n');
      callback(array);
    });  
};

exports.isUrlInList = function(target, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
      if (err) throw err;
      console.log(data.toString());
      var array = data.toString().split('\n');
      console.log(target);
      if (array.indexOf(target) > -1) {
        callback(true);
      } else {
        callback(false);
      }
    });  
  // exports.readListOfUrls(function(array){
  //   if (array.indexOf(target) > -1) {
  //     callback(true);
  //   } else {
  //     callback(false);
  //   }
  // });
};

exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls(function(array){
    array.push(url);
    fs.writeFile(exports.paths.list, array.join('\n'), function(err, data) {
      if (err) throw callback(false);
      else callback(true);
    });
  });
};

exports.isUrlArchived = function(url, callback) {

  var urls = fs.readdir(exports.paths.archivedSites, function(err, files) {

    if (err) throw err;

    if(files.indexOf(url) > -1){
      callback(true);
    } else {
      callback(false);
    }    

  });
};

var writeToFile = function(url){
  var fullUrl = 'http://' + url;
  var fullPath = exports.paths.archivedSites + '/' + url;
  http.get(fullUrl, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      fs.writeFile(fullPath, body, function(err, data) {
        if (err) throw err;
      });
    });
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    writeToFile(url);
  });
};
