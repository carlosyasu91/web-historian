var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('Serving request type: ' + req.method + ', for url: ' + req.url);
  var parsedUrl = url.parse(req.url);
  if (req.method === 'GET') {

    if(parsedUrl.pathname === "/www.google.com"){ 

      console.log('inside.................path', parsedUrl.pathname.slice(1));

      archive.isUrlArchived(parsedUrl.pathname.slice(1), function(err, data){
        if(err) throw err;
        res.writeHead(200, httpHelpers.headers);
        res.end(data);  
      });
    } 
    fs.readFile(archive.paths.index,'utf-8', function(err, data) {
      if (err) throw err;
      // console.log(data);
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    });
  }

  // res.end(archive.paths.list);
};
