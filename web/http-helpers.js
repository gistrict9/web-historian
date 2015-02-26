var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {

};



// As you progress, keep thinking about what helper functions you can put here!
exports.renderHTML = function(res, req, site) {
  var fixtureName = site;
  var fixturePath = path.archivedSites + "/" + fixtureName;

  fs.readFile(fixturePath, function(error, data) {
    if (error) {
      console.log(error);
    }
    var loadingPage = data;
    res.write(loadingPage);
    res.end();
  });
};
