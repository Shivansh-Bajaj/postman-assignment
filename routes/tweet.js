const express = require('express');
const router = express.Router();
const db = require('../models/all-models');


/* GET home page. */
router.get('/', async function(req, res) {
  try {
    let tweetsIds = req.user.tweets.map(tweet => {
      return tweet.toString();
    });
    let tweets = await db.Tweet.find({'_id': { '$in': tweetsIds}});
    return res.status(200).send({
      'status': 'success',
      'data': tweets 
    });
  } catch (e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to read tweet'
    });
  }
});

router.get('/all', async function(req, res) {
  try {
    let users = req.user.following.map((obj) => {
      return obj.toString();
    });
    users.push(req.user._id.toString());
    let tweets = await db.Tweet.find({'by': { '$in': users}});
    return res.status(200).send({
      'status': 'success',
      'data': tweets 
    });
  } catch {e} {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to read tweet'
    });
  }
});

router.post('/', async function(req, res) {
  try {
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('body')) {
      let tweet  = await db.Tweet({
        title: req.body.title,
        body: req.body.body,
        by: req.user._id
      });
      await tweet.save();
      req.user.tweets.push(tweet);
      await req.user.save();
      return res.status(200).json({
        'status': 'success',
        'data': tweet
      });
    }
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to create tweet'
    });
  }
});

router.delete('/', async function(req, res) {
  try {
    if (req.body.hasOwnProperty('id')) {
      let tweet = await db.Tweet.findOneAndDelete({'_id': req.body.id, 'by': req.user._id});
      if (tweet) {
        req.user.tweets.remove(req.body.id);
        await req.user.save();  
        return res.status(200).json({
          'status': 'success',
          'data': tweet
        });
      } else {
        return res.status(407).json({
          'status': 'fail',
          'data': 'unable to find your tweet with id ' + req.body._id
        });
      }
    };
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to create tweet'
    });
  }
});


router.post('/like', async function(req, res) {
  try { 
    let tweet = await Models.Tweet.findOneAndUpdate({ _id: res._id }, { $inc: { likes: 1 } }, {new: true })
    return res.status(200).json({
      'status': 'success',
      'data': tweet
    });
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to create tweet'
  });
  }
});

router.post('/retweet', async function(req, res) {
  try {
    let tweet  = await db.Tweet.findOne({'_id': req.body.id});
    req.user.tweets.push(tweet);
    await req.user.save();
    return res.status(200).json({
      'status': 'success',
      'data': tweet
    });  
  } catch(e) {
    return res.status(500).json({
      'status': 'fail',
      'err': JSON.stringify(e),
      'message': 'unable to create tweet'
    });
  }
});
module.exports = router;
