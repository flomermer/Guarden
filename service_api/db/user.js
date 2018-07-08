const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleID: {type:String, required:true},    
    fullName: {type:String, required: true},
    email: {type:String, required:true},
    pic: {type:String, default: null},
    level: {type: Number, default: 1},
    points: {type:Number, default: 0},
    about: {type: String, default:'' },
    community_id: {type: Schema.Types.ObjectId , ref : 'Community', default: null},
    selectedTask: {type: Schema.Types.ObjectId , ref : 'Task'},
    lastTask: {type: Schema.Types.ObjectId , ref : 'Task'}
  },{collection: 'users'});


module.exports = mongoose.model('User',UserSchema);
