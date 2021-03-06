const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommunitySchema = new Schema({
    name: {type:String, required: true},
    pic: {type: String, required: true},
    posts: [{
      author_id: {type: Schema.Types.ObjectId , ref : 'User'},
      content: String,
      date: {type: Date, default: new Date()},
      isLike: {type: Boolean, default:false},
      comments: [{
        author_id: {type: Schema.Types.ObjectId , ref : 'User'},
        content: String
      }]
    }]
  },{collection: 'communities'});

module.exports = mongoose.model('Community',CommunitySchema);
