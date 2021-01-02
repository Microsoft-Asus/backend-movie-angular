let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let text = require('./TextModel');

let chatWithFriendModelSchema = new Schema({
  id: Number,
  user: Array,
  text: Array,
}, {
  collection: 'chatWithFriends'
})
module.exports = mongoose.model('chatWithFriend', chatWithFriendModelSchema);
