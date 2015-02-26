var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // Status Code

  var headers = {};
  headers['Content-Type'] = "text/html";
  headers['Location'] = '../public/index.html';

  if (req.method === 'GET' && req.url === '/') {

    res.writeHead(200, headers);

    res.end();
    // var loadingPage;

    // fs.readFile ('web/public/loading.html', function(error, data) {
    //   if (error) {
    //     console.log(error);
    //   }
    //   loadingPage = data;
    //   res.writeHead(200, headers);
    //   console.log(loadingPage);
    //   res.write(loadingPage);
    //   res.end();
    // });

  }

  if (req.method === 'GET' && req.url.match(/www/)) {
    // make call to isURLArchived(site, req, res, callback)
    //

    //call httpHelper(req, res){
    //do some stuff to update res data
    //call res.end
    //}
    //
    //if url archived
    //status of 200
    //
    //res.end();
  }



};
