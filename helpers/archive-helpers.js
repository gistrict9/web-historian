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
  fs.readFileSync('./archives/sites.txt', function(err, data){
    if (err){
      console.log(err);
    }
    var result = data.toString().split('\n');
    callback(result);
  });
};

exports.isUrlInList = function(site){
  // 2. Yes = Working, here is loading page
  // 3. No = addUrlToList, here is the loading page
  // 1. Yes = Here is the HTML

  exports.readListOfUrls(function(sites){
    if (_.indexOf(sites, site) === -1){
      exports.addUrlToList(site);
    }
    else {
      console.log('readListOfUrls says: its already in the list');
    }
  });
};

exports.addUrlToList = function(site){
  var site = site +'\n';
  fs.appendFile('./archives/sites.txt', site, function(err){
    if (err) throw err;
    console.log('addUrl says: It\'s saved!');
  });
};

exports.isURLArchived = function(site, res, req, callback){
  var fixtureName = site;
  var fixturePath = exports.paths.archivedSites + "/" + fixtureName;
  fs.exists(fixturePath, function(exists){
    if (exists){
      //execute callback on fixturePath
      renderHTML(res, req);
      console.log('isUrlArchived says: here is your file');
    }
    else {
      exports.isUrlInList(site);
    }
  });
};

exports.downloadUrls = function(){
  //downloads actual html when called
};

exports.caller = function(func) {
  func();
};
