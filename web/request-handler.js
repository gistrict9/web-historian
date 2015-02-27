var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  // Status Code

  if (req.method === 'GET' && req.url === '/') {

    fs.readFile ('web/public/index.html', function(error, data) {
      if (error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data);
      res.end();
    });

  }

  if (req.method === 'GET' && req.url.match(/css/)) {
    var url = req.url.split('/');
    var file = url[url.length - 1];

    fs.readFile('web/public/' + file, function(error, data) {
      if (error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type':'text/css'});
      res.write(data);
      res.end();
    });
  }

  if (req.method === 'GET' && req.url.match(/www/)) {
    var url = req.url.split('/');
    var file = url[url.length - 1];

    var fixturePath = archive.paths.archivedSites + "/" + file;
    fs.exists(fixturePath, function(exists){
      if (exists){
        archive.isURLArchived(file, res, req, httpHelpers.returnArchive);
      }
      else {
        res.writeHead(404, {'Content-Type':'text/html'});
        res.write('<p>404 Error: The page you are looking for does not exist.</p>');
        res.end();
      }
    });
  }

  if (req.method === 'POST') {
    var body = '';

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      var url = body.split('=')[1];

      fs.exists(fixturePath, function(exists){
        if (exists){
          archive.isURLArchived(url, res, req, httpHelpers.returnArchive);
        }
        else {

        }
      });

    });
  }

};
