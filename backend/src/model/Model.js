const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: Buffer,
    required: true
  }
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
