var express = require('./config/express');

var port = 3000;
var app = express();
app.listen(port);

console.log('listening on port ' + port);
