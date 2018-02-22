const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');
const helper = require('./helper/helper.js');
const Twitter = require('twitter');
const PythonShell = require('python-shell');
require('dotenv').config()

// mongoose.connect('mongodb://localhost/twitter-head', { useMongoClient: true });
// mongoose.Promise = require('bluebird');

const app = express();

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport')(passport);

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.post('/twitter', (req, res) => {
    res.setHeader('content-type', 'application/json');
    client.get('users/show', {screen_name: req.body.username},
    (err, data, response) => {
      if(err) res.status(400).json({ message: err });
      else {
        let resp = JSON.parse(response.body);
        res.status(200).json({data: resp });
      }
    });
});

app.post('/predict', (req, res) => {
    res.setHeader('content-type', 'application/json');
    let args = req.body.args;
    args = args.join();
    var options = {
      mode: 'json',
      args: args
    };
    PythonShell.run('classifier.py', options, (err, results) => {
      if (err) res.status(400).json({ message: err });
      res.status(200).json({results: results[0]});
    });
});

let port = helper.normalizePort(process.env.PORT || '8000');

app.listen(process.env.PORT || 8000, () => {
    console.log("Application has been started!");
});
