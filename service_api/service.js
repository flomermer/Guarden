const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const sendError = require("./routes/error");

const router_community = require('./routes/community');
const router_user = require('./routes/user');
const router_task =require('./routes/task');

const PORT = process.env.PORT || 8000;

function startService(){
  mongoose.connect("mongodb://grd_user:grd_pass123@ds139920.mlab.com:39920/guarden",function(err){
    console.log("connected to mLab");
  });

  app.use(express.static("."));
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  app.use(bodyParser.raw());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

  app.get("/", (req,res) => {
    res.redirect('/API');
  });

  app.use('/community', router_community);
  app.use('/user', router_user);
  app.use('/task', router_task);

  app.get("/API", (req,res) => {
    res.sendFile(path.join(__dirname + '/API/index.html'));
  });

  app.all('/*', function(req, res) {
      return sendError(res, "404 not found");
  });

  http.createServer(app).listen(PORT);
  console.log(`Listening on port ${PORT}`);
}

module.exports = {
  startService
}
