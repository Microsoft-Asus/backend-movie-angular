let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieModelSchema = new Schema({

  id: Number,
  name: String,
  category:String,
  release_year: Number,
  run_time: Number,
  rate: Number,
  name_image: String,
  vice_name_image:String,
  genre: [String],
  real_name:String,
  status:String,
  director:String,
  country:[String],
  episode:Number,
  views:Number,
  actor:[String],
  content:String,
  tags:[String],
  name_video:String,
  theater: Boolean

},{
   collection: 'movies'
})
module.exports = mongoose.model('Movie', movieModelSchema);
