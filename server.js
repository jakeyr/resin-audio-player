var express = require('express');
var app = express();

var say = require('say');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

// reply to request with "Hello World!"
app.post('/speak', function (req, res, next) {
  console.log("Speaking " + req.body.message);
  say.speak(req.body.message);
  res.sendStatus(200);
});

//start a server on port 80 and log its start to our console
var server = app.listen(process.env.PORT || 80, function () {
  var port = server.address().port;
  console.log('Example app listening on port ', port);
});
