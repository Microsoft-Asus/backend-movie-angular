const { time } = require('console');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TextModelSchema = new Schema([{
  id: Number,
  nameUser: String,
  content: String,
}], {
  collection: 'texts'
})
module.exports = mongoose.model('text', TextModelSchema);
