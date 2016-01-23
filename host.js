var express = require('express');
var exphbs  = require('express-handlebars');
var spawn = require('child_process').spawn;
var ip = require('ip').address();
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {
    	ip: ip
    });
});

app.listen(3005, function () {
  console.log('Running FANS Communication Server. Launching browser.');
  spawn('open', ['http://localhost:3005/']);
});

