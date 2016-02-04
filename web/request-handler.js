'use strict';
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');

// require more modules/folders here!

function finishResponse(res, statusCode, data){
  res.writeHead(statusCode, httpHelpers.headers);
  res.end(data);
}

var handleGet = function(req, res, path, urlObj){

};

var getArchivedData = function(path, res){
  var fullUrl = archive.paths.archivedSites + '/' + path;
  var body = '';
  var data = fs.readFile(fullUrl, function (err, data) {
    if (err) throw err;
    finishResponse(res, 200, data);
  });
};

exports.handleRequest = function (req, res) {

  console.log('Serving request type: ' + req.method + ', for url: ' + req.url);

  var parsedUrl = url.parse(req.url);
  var path = parsedUrl.pathname.slice(1);
  if (req.method === 'GET') {
    if(path.length > 0){ 
      archive.isUrlArchived(path, function(isArchived){
      if(isArchived){
        getArchivedData(path, res);
      } else {
        finishResponse(res, 404, '404');
      }
    });
  } else { 
      fs.readFile(archive.paths.index,'utf-8', function(err, data) {
        if (err) throw err;
        finishResponse(res, 200, data);
      });
    }
  }

  // res.end(archive.paths.list);
};
