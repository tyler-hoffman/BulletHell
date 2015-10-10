var express = require('express');
var morgan = require('morgan');

module.exports = function() {
  var app = express();

  app.use(morgan('dev'));
  app.use(express.static('./public'));

  return app;
};
