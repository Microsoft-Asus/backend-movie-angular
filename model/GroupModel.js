let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let groupModelSchema = new Schema({
  id: Number,
  group:String,
  user:Array,
  text: Array
},{
   collection: 'groups'
})
module.exports = mongoose.model('group', groupModelSchema);
