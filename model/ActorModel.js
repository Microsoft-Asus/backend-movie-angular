let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let actorModelSchema = new Schema({

  id: Number,
  name: String,
  real_name:String,
  name_image:String,

},{
   collection: 'actors'
})
module.exports = mongoose.model('Actor', actorModelSchema);
