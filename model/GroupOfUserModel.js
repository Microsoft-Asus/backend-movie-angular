let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let groupOfUserModelSchema = new Schema({
  id: Number,
  user: String,
  group: Array
}, {
  collection: 'groupOfUsers'
})
module.exports = mongoose.model('groupOfUser', groupOfUserModelSchema);
