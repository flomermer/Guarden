const router = require('express').Router();
const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;

const sendError = require("./error");
const sendSuccess = require('./success');

const Community = require('../db/community');
const User = require('../db/user');

router.put('/likePost', function(req, res) {
  let post_id = req.body.post_id;

  if(!post_id)
    return sendError(res,'post_id missing');

  Community.update({ 'posts._id': post_id }, { $set:  { 'posts.$.isLike': true }}, (err, result) => {
      if(err)
        sendError(res,err.message);
      sendSuccess(res);
  });
});

router.put('/dislikePost', function(req, res) {
  let post_id = req.body.post_id;

  if(!post_id)
    return sendError(res,'post_id missing');

  Community.update({ 'posts._id': post_id }, { $set:  { 'posts.$.isLike': false }}, (err, result) => {
      if(err)
        sendError(res,err.message);
      sendSuccess(res);
  });
});

router.put('/addComment', function(req, res) {
  let post_id = req.body.post_id;
  let user_id = req.body.user_id;
  let content = req.body.content;

  if(!post_id || !user_id || !content)
    return sendError(res,'post_id || user_id || content params are missing');

  var newComment = {
    author_id: objectID(user_id),
    content: content
  };

  Community.update({ 'posts._id': post_id }, { $push:  { 'posts.$.comments': newComment }}, (err, result) => {
      if(err)
        sendError(res,err.message);
      sendSuccess(res);
  });
});

router.put('/addPost', function(req, res) {
  let community_id = req.body.community_id;
  let user_id = req.body.user_id;
  let content = req.body.content;

  if(!community_id || !user_id || !content)
    return sendError(res,'community_id || user_id || content params are missing');

  User.findById(user_id, (err,user) => {
    if(!user)
       return sendError(res, `user: ${user_id} not exists`);

    Community.findById(community_id, (err,community) => {
      if(!community)
         return sendError(res, `community: ${community_id} not exists`);

      var newPost = {
        author_id: objectID(user_id),
        content: content
      };

      community.posts.push(newPost);
      community.save();
      sendSuccess(res);
     });
   });
});

router.post('/removeUserFromCommunity', function(req, res) {
  let user_id = req.body.user_id;
  let community_id = req.body.community_id;
  if(!user_id || !community_id)
     return sendError(res, `user_id || community_id are missing`);

  Community.findById(community_id, (err,community) => {
    if(!community)
       return sendError(res, `community: ${community_id} not exists`);

     User.findByIdAndUpdate(user_id,{community_id: null }, function(err, result){
         if(err)
            return sendError(res, `user_id ${user_id} not exists`);

         return sendSuccess(res);
       });
  });
});


router.post('/invite', function(req, res) {
  let user_id = req.body.user_id;
  let community_id = req.body.community_id;
  if(!user_id || !community_id)
     return sendError(res, `user_id || community_id are missing`);

  Community.findById(community_id, (err,community) => {
    if(!community)
       return sendError(res, `community: ${community_id} not exists`);

     User.findById(user_id, (err,user) => {
       if(!user)
          return sendError(res, `user: ${user_id} not exists`);

        user.community_id = objectID(community_id);
        user.save();
        sendSuccess(res);
      });
  });
});

router.post('/edit', function(req, res) {
  let newName = req.body.name;
  let community_id = req.body.community_id;
  if(!newName)
    return sendError(res,'name param is missing');
  else if(!community_id)
    return sendError(res,'community_id param is missing');

  Community.findByIdAndUpdate(community_id,{name: newName }, function(err, result){
      if(err)
         return sendError(res, `community_id ${community_id} not exists`);

      return sendSuccess(res);
    });
});


router.put('/add', function(req, res) {
  let _name = req.body.name;
  if(!_name)
    return sendError(res,'name param is missing');

  var newCommunity = new Community({ name: _name });
  newCommunity.save(function (err) {
    if (err) return res.json(err);

    return sendSuccess(res);
  });
});

router.delete('/delete', function(req, res) {
  let _id = req.body.community_id;
  if(!_id)
    return sendError(res,"community_id is missing");


  Community.findOneAndRemove({ _id })
    .exec(function(err, community) {
      if (err || !community)
        return sendError(res,`community_id ${_id} not found`);

    return sendSuccess(res);
  });
});

module.exports = router;
