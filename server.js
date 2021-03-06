var express    = require('express');
var http       = require('http');
var say        = require('say');
var bodyParser = require('body-parser');
var fs         = require('fs');
var crypto     = require('crypto');
var play       = require('play').Play();
var request    = require('request');

var app = express();

app.use(bodyParser.json()); // for parsing application/json

app.post('/speak', function (req, res, next) {
  console.log("Speaking " + req.body.message);
  say.speak(req.body.message);
  res.sendStatus(200);
});

app.post('/play', function (req, res, next) {
  console.log("Playing " + req.body.url);

  var fileName = "/tmp/" + crypto.createHash('md5').update(req.body.url).digest("hex") + "." + (req.body.ext || "mp3");

  fs.exists(fileName, function(exists) {
    if (exists) {
      console.log("Playing local cached file " + fileName);
      play.sound(fileName);
    } else {
      console.log("Downloading to " + fileName);
      var file = fs.createWriteStream(fileName);
      response = 
        request(req.body.url)
        .on('error', function(err) {
          console.log(err);
        })
        .pipe(file);
      response.on('finish', function () {
        play.sound(fileName);
      });
    }
  });

  res.sendStatus(200);
});

//start a server on port 80 and log its start to our console
var server = app.listen(process.env.PORT || 80, function () {
  var port = server.address().port;
  console.log('PiSpeaker app listening on port ', port);
});
