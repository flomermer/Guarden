const router = require('express').Router();
const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;

const sendError = require("./error");
const sendSuccess = require('./success');

const Community = require('../db/community');
const User = require('../db/user');
const Task = require('../db/task');

const POINTS_PER_LEVEL = 10;

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

router.post('/getTaskList', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,'user_id params is missing');

  User.findById(user_id, (err,user) => {
    if(!user)
       return sendError(res, `user: ${user_id} not exists`);

     Task.update({
       isSpecial: 1,
       expireDate: {$lte: Date.now()}
     }, {
       isOpen: true,
       expireDate: null
     }, {multi: true}, (err,doc) => {

       Task.find({
         community_id: user.community_id
       }, (err,tasks) => {
         res.json(tasks);
       });

     }); //task.update
   });   //user.findByID
});

router.get('/getAll', function(req, res) {
  Task.find()
    .then(function(doc){
      res.json(doc);
  });
});

function cancelTask(task_id){
  if(!task_id) return false;

  Task.findById(task_id, (err,task) => {
    if(!task) return false;

    task.isOpen = true;
    task.save();
    return true;
  });
};

router.post('/complete', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,'user_id params is missing');

  User.findById(user_id, (err,user) => {
    if(!user)
       return sendError(res, `user: ${user_id} not exists`);
    if(!user.selectedTask)
      return sendError(res, `user has no current task`);

    Task.findById(user.selectedTask, (err,task) => {
      if(task.isSpecial){
        task.expireDate = new Date().addHours(task.expireDuration);
        task.save();
      }

      user.selectedTask = null;
      let newPoints = user.points + task.points;
      if(newPoints>=10)
        user.level += 1;
      user.points = newPoints % POINTS_PER_LEVEL;
      user.lastTask = objectID(task._id);
      user.save();

      /*send new post*/
      let community_id = user.community_id;
      Community.findById(community_id, (err,community) => {
        if(!community)
           return sendError(res, `community: ${community_id} not exists`);

        var newPost = {
          author_id: objectID(user_id),
          content: `I've just completed Task: ${task.title}`
        };

        community.posts.unshift(newPost);
        community.save();
        return res.json({user: user, newPost: null});
      });
    });
  });
});


router.post('/choose', function(req, res) {
  let user_id = req.body.user_id;
  let task_id = req.body.task_id;

  if(!task_id || !user_id)
    return sendError(res,'task_id || user_id params are missing');

  Task.findById(task_id, (err,task) => {
    if(!task)
       return sendError(res, `task: ${task_id} not exists`);
    User.findById(user_id, (err,user) => {
      if(!user)
         return sendError(res, `user: ${user_id} not exists`);
      else if(String(user.community_id) != String(task.community_id))
        return sendError(res, `user is not belong to task's community`);
      else if(Number(user.level)<Number(task.level))
        return sendError(res, `user level(${user.level}) is to low for this task level(${task.level})`);

      if(user.selectedTask) //user already has current task
          cancelTask(user.selectedTask);

      if(task.isSpecial){
        task.isOpen = false;
        task.save();
      }

      user.selectedTask = objectID(task_id);
      user.save();
      return sendSuccess(res);
    });
  });
});

router.post('/cancel', function(req, res) {
  let user_id = req.body.user_id;

  if(!user_id)
    return sendError(res,'user_id params are missing');

  User.findById(user_id, (err,user) => {
    if(!user)
       return sendError(res, `user: ${user_id} not exists`);
    else if(!user.selectedTask)
      return sendError(res, `user has not task selected`);

    cancelTask(user.selectedTask);

    user.selectedTask = null;
    user.save();
    return sendSuccess(res);
  });
});


router.delete('/delete', function(req, res) {
  let _id = req.body.task_id;
  if(!_id)
    return sendError(res,"task_id is missing");


  Task.findOneAndRemove({ _id })
    .exec(function(err, task) {
      if (err || !task)
        return sendError(res,`task_id ${_id} not found`);

    return sendSuccess(res);
  });
});

router.put('/add', function(req, res) {
  let community_id = req.body.community_id;
  let title = req.body.title;
  let desc = req.body.desc;
  let level = req.body.level;
  let points = req.body.points;
  let expireDuration = req.body.expireDuration || null;
  let isSpecial;

  if(!community_id) return sendError(res,'community_id param is missing');
  else if(!desc || !level || !title || !points) return sendError(res,'title || desc || level || points params are missing');
  else if(points > 10 || points < 1 ) return sendError(res,'points must be between 1 to 10');

  //if(expireDuration ? isSpecial=true : isSpecial=false);
  if(expireDuration){ //String of w:d:h
      isSpecial=true;
      let durationArr = expireDuration.split(":");
      let weeks = durationArr[0];
      let days = durationArr[1];
      let hours = durationArr[2];

      expireDuration = Number(24*7*weeks) + Number(24*days) + Number(hours);
  }else{
    isSpecial=false;
  }

  var task = {
    community_id,
    isSpecial,
    desc,
    level,
    points,
    expireDuration
  }
  var newTask = new Task(task);
  newTask.save(function (err) {
    if (err) return res.json(err.message);

    return sendSuccess(res);
  });
});

router.post('/unlockExpired', function(req, res) {
  Task.update({
    isSpecial: 1,
    expireDate: {$lte: Date.now()}
  }, {
    isOpen: true,
    expireDate: null
  }, {multi: true}, (err,doc) => {
    if(err)
      sendError(res,"error mother fucker");
    sendSuccess(res);
  })
});


module.exports = router;
