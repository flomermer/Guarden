const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectID = Schema.Types.ObjectId;

var TaskSchema = new Schema({
    community_id: {type: objectID , ref : 'Community', required: true},
    level: Number,
    isSpecial: {type: Boolean, default: false},
    title: String,
    desc: String,
    points: Number,
    isOpen: {type:Boolean, default: true},
    expireDate: {type: Date, default: null},
    expireDuration: Number
  },{collection: 'tasks'});


module.exports = mongoose.model('Task',TaskSchema);
