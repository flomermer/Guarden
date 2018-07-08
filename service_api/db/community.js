const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommunitySchema = new Schema({
    name: {type:String, required: true},
    posts: [{
      author_id: {type: Schema.Types.ObjectId , ref : 'User'},
      content: String,
      pic: String,
      isLike: {type: Boolean, default:false},
      comments: [{
        author_id: {type: Schema.Types.ObjectId , ref : 'User'},
        content: String
      }]
    }]
  },{collection: 'communities'});

module.exports = mongoose.model('Community',CommunitySchema);
