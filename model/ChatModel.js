let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let textModel = require('./TextModel');

let chatModelSchema = new Schema({
  id: Number,
  nameGrounp: String,
  userGroup: Array,
  text: Object,
}, {
  collection: 'chats'
})
module.exports = mongoose.model('chat', chatModelSchema);
