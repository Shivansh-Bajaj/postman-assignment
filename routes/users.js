const express = require('express');
const router = express.Router();
const db = require('../models/all-models');


/* GET users listing. */
router.get('/me', function(req, res, next) {
  res.send(req.user);
});



router.post('/follow', async function(req, res) {
  try {
    if (!req.body.hasOwnProperty('username')) {
      return res.status(422).json({
        'status': 'fail',
        'msg': 'please provide username'
      });
    }
    let user = await db.User.findOne({"username": req.body.username});
    if (!user) {
      return res.status(422).json({
        'status': 'fail',
        'msg': 'user not found'
      });
    }
    req.user.following.push(user);
    user.follower.push(req.user);
    await req.user.save();
    await user.save();
    return res.status(200).json({
      'status': 'success',
      'msg': 'you are following ' + user.username 
    });
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'msg': 'you are following ' + user.username 
    });
  }
});

router.post('/unfollow', async function(req, res) {
  try {
    if (!req.body.hasOwnProperty('username')) {
      return res.status(422).json({
        'status': 'fail',
        'msg': 'please provide username'
      });
    }
    let user = await db.User.findOne({"username": req.body.username});
    if (!user) {
      return res.status(422).json({
        'status': 'fail',
        'msg': 'user not found'
      });
    }
    req.user.following.remove(user._id);
    user.follower.remove(req.user._id);
    await req.user.save();
    await user.save();
    return res.status(200).json({
      'status': 'success',
      'msg': 'you are following ' + user.username 
    });
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'msg': 'you are following ' + user.username 
    });
  }
});


module.exports = router;
