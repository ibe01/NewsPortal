var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var bp = require('body-parser');
var mongoose = require('mongoose');
var User = require('./backEnd/model');
//mongodb://<dbuser>:<dbpassword>@ds129013.mlab.com:29013/newsportal
//mongoose.connect('mongodb://localhost:27017/newsPortal', { useMongoClient: true}, function(err) {
mongoose.connect('mongodb://SP001:iamsp001@ds129013.mlab.com:29013/newsportal', { useMongoClient: true}, function(err) {
  mongoose.Promise = global.Promise;
  if(err) {
    console.log('not ok' + err);
  } else {
    console.log('connected to db..');
  }
});

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.post('/post', function(req, res) {
  var user = new User();
  user.header = req.body.header;
  user.image = req.body.image;
  user.desc = req.body.desc;
  if(req.body.image == "" || req.body.image == null) {
    user.image = 'images/bg12.jpg';
    user.save(function(err) {
      if (err) {
        console.log('not ok..');
      } else {
        console.log('ok mari..');
      }
    });
  } else {
    user.save(function(err) {
      if (err) {
        console.log('not ok..');
      } else {
        console.log('ok mari..');
      }
    });
  }
});

app.get('/news', function(req, res) {
  User.find({}).exec(function(err, db) {
    if (err) throw err;
    if(!db) {
      res.send('no user..');
    } if(db) {
      console.log(db);
      res.send(db);
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function() {
  console.log('listening on port ' + port);
});
