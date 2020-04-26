
var express = require("express");
var path = require("path");

module.exports = function(app) {

  app.use(express.static('public'));

  app.get("/notes", function(req, res) {
    res.sendFile(path.join( __dirname, '/../public/notes.html'));
  });

  app.get("/*", function(req, res) {
    res.sendFile(path.join( __dirname, '/../public/index.html'));
  });

};