const _ = require('lodash');
const router = require('express').Router();
const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;
const Community = require('../db/community');
const User = require('../db/user');

const sendError = require('./error');
const sendSuccess = require('./success');


router.post('/getTreeUsers', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,"user_id param is missing");


  User.findById(user_id).
    exec(function (err, user) {
      if (err) return sendError(err.message);

      User.find({
        community_id: user.community_id,
        _id: {$ne: user_id}
      }).sort('level').exec((err,users) => {
        if(err) return sendError(err.message);

        let levelObj = _.mapKeys(users,'level');
        res.json(levelObj);
      });
    });
});

router.post('/getByID', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,"user_id param is missing");

  User.findById(user_id).
    populate('selectedTask').populate('lastTask').
    exec(function (err, user) {
      if (err) return sendError(err.message);

      res.json(user);
    });
});

router.get('/getAll', function(req, res) {
  User.find()
    .then(function(doc){
      res.json(doc);
  });
});

router.post("/googleLogin", (req, res) => {
  const data = req.body;
  const {googleID, googleToken, email, pic, fullName} = data;

  User.findOne({googleID}).then((user) => {
    if(!user){ //need to automatically sign up user
      var newUser = new User({
        googleID,
        email,
        fullName,
        pic
      });
      console.log(newUser);
      newUser.save((err, newUser) => {
        if(err) return sendError(err.message)
        return res.json(newUser);
      });
    } else { //user already exists
      /*
      user.googleToken = googleToken;
      user.save((err, updatedUser) => {
        if(err) return sendError(err.message)
        return res.json(updatedUser);
      });
      */
      return res.json(user);
    }
  });
});

router.put('/add', function(req, res) {
  let fullName = req.body.fullName;
  let email = req.body.email;
  let googleToken = req.body.googleToken;

  if(!fullName || !email || !googleToken)
    return sendError(res,"fullName || email || googleToken params are missing");

  var newUser = new User({
    fullName,
    email,
    googleToken
  });
  newUser.save(function (err) {
    if (err) return sendError(err.message);

    return sendSuccess(res);
  });
});

router.post('/edit', function(req, res) {
  let user_id = req.body.user_id;
  let about = req.body.about;

  if(!user_id)
    return sendError(res,"user_id param is missing");

  User.findByIdAndUpdate(user_id, {about}, function(err, result){
    if(err)
       return sendError(res, `user_id ${user_id} not exists`);

    return sendSuccess(res);
  });
});


module.exports = router;
