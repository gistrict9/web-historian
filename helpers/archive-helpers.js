var http = require("http");
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
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile('./archives/sites.txt', function(err, data){
    if (err){
      console.log(err);
    }
    var result = data.toString().split('\n');
    callback(result);
  });
};

exports.isUrlInList = function(site, res, req){

  //make callback function
  //take result and request and return a function that
  //takes in just sites
  //
  var makeCallback = function(res, req){
    return function(sites){
      if (_.indexOf(sites, site) === -1){
        exports.addUrlToList(res, req, site);
      }
      else {
        fs.readFile('./web/public/loading.html', function(error, data) {
          if (error) {
            console.log(error);
          }
          res.writeHead(200, {'Content-Type':'text/html'});
          res.write(data);
          res.end();
        });
      }
    };
  };

  var temp = makeCallback(res, req);

  exports.readListOfUrls(temp);
};

exports.addUrlToList = function(res, req, site){
  var site = site +'\n';
  fs.appendFile('./archives/sites.txt', site, function(err){
    if (err) throw err;
    fs.readFile('./web/public/loading.html', function(error, data) {
      if (error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data);
      res.end();
    });
  });
};

exports.isURLArchived = function(site, res, req, callback){
  var fixtureName = site;
  var fixturePath = exports.paths.archivedSites + "/" + fixtureName;
  fs.exists(fixturePath, function(exists){
    if (exists){
      //execute callback on fixturePath
      callback(site, res, req);
      console.log('isUrlArchived says: here is your file');
    }
    else {
      exports.isUrlInList(site, res, req);
      exports.downloadUrls(site, res, req);
    }
  });
};

exports.downloadUrls = function(site, res, req){
  var options = {
    host: site,
    port: 80,
    path: '/index.html'
  };

  http.get(options, function(res) {
    var body = '';

    res.on('data', function(data) {
      body += data;
    });

    res.on('end', function() {
      // write body to file
      // create a file in the sites directory
      // open and write the body to that file
      // close the file
      fs.writeFile("./archives/sites/" + site, body, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("The file was saved!");
          }
      });
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

