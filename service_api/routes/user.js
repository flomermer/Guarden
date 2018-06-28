const router = require('express').Router();
const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;
const Community = require('../db/community');
const User = require('../db/user');

const sendError = require('./error');
const sendSuccess = require('./success');

router.post('/getByID', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,"user_id param is missing");

  User.findById(user_id,(err,user) => {
    if(err)
       return sendError(res, `user_id ${user_id} not exists`);

    res.json(user);
  });
});

router.get('/getAll', function(req, res) {
  User.find()
    .then(function(doc){
      res.json(doc);
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
    if (err) return res.json(err);

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
