var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // Status Code

  if (req.method === 'GET' && req.url === '/') {
    var loadingPage;

    fs.readFile('web/public/loading.html', function(error, data) {
      if (error) {
        console.log(error);
      }
      loadingPage = data;
      res.write(loadingPage);
    });

    res.writeHead(200);
    res.end(loadingPage);
  }

  if (req.method === 'GET' && req.url.match(/.com/) === '/www.google.com') {
    res.writeHead(200);
    res.write('google');
    res.end();
  }



};
