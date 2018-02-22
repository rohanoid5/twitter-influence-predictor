const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.json("location is root.")
});

router.post('/register', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ status: 500, message: err });
        } else {
            res.json({ status: 200, message: "user has  been registered." });
        }
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    res.json({ user: req.user, message: "you are in the profile route." });
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
// 	res.setHeader('content-type', 'application/json');
// 	res.json({"status": "ok"});
// });

router.post('/authenticate', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    let password = 'sweet_nibba';
    let email = req.body.email;

    User.findOne({email: email}, (err, foundUser) => {
      if (err)
        return res.status(400).json({ message: err });
      if(!foundUser) {
        let newUser = new User({
            email: req.body.email,
            password: password,
        });
        User.addUser(newUser, (err, user) => {
            if (err) {
              return res.status(400).json({ message: err });
            } else {
              const token = jwt.sign(user, "My app secret", {
                  expiresIn: 604800
              });
              user.name = req.body.name;
              user.image = req.body.image;
              user.save((err, data) => {
                if (err) res.status(400).json({ message: err });
                else {
                  return res.status(200).json({
                      success: true,
                      token: 'JWT ' + token,
                      user: {
                          id: data._id,
                          name: data.name,
                          username: data.username,
                          email: data.email
                      }
                  });
                }
              });
            }
        });
      } else {
        const token = jwt.sign(foundUser, "My app secret", {
            expiresIn: 604800
        });
        return res.status(200).json({
            success: true,
            token: 'JWT ' + token,
            user: {
                id: foundUser._id,
                name: foundUser.name,
                username: foundUser.username,
                email: foundUser.email
            }
        });
      }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.setHeader('content-type', 'application/json');
    res.json({ "status": "Logged out" });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Not logged in");
    res.setHeader('content-type', 'application/json');
    res.json({ "status": "Not logged in" });
};

module.exports = router;
