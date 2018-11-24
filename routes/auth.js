const config = require('../config/config.json');
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/all-models').User;

/* signup api */
router.post('/signup', async function(req, res) {
  try {
    if (!req.body.hasOwnProperty('username') ||
        !req.body.hasOwnProperty('password') ) {
        return res.json({
          'status': 'fail',
          'message': 'fields missing'
        });
    };
    let user = await userModel({
      username: req.body.username,
      password: req.body.password
    }).save();
    return res.status(200).json({
      'status': 'success',
      'msg': 'successful created user account'
    })
  } catch(e) {
    return res.status(500).json({
      'status': 'error',
      'msg': 'failed',
      'err': e
    });
  }  
});
/* POST login. */
router.post('/login', function (req, res, next) {
  try {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        return res.status(400).json({
            'msg': 'issue while login',
            'status': 'fail'
        });
      }
      if (!user) {
        return res.status(403).json({
          'msg': 'authentication fail',
          'status': 'fail'
        });
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
            res.status(403).json({"status": "fail", "error": err, 'msg': 'authentication fail'});
        }
        const token = jwt.sign({
          _id: user._id,
          username: user.username
        }, config.jwtKey);
        return res.json({user, token});
      });
    })(req, res);
  } catch (e){
    return res.status(501).json({
      'status': 'fail',
      'err': e
    })
  }
});

module.exports = router;