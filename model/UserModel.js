let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModelSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  watchLater: Array,
  favorite: Array,
  avatar: String,
  group:Array,
  friend:Array,
},{
   collection: 'users'
})
module.exports = mongoose.model('user', userModelSchema);
