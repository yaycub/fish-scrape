const mongoose = require('mongoose');

const seasonSchema = {
  start: {
    type: Number,
  },
  end: {
    type: Number
  }
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  season: seasonSchema,
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Fish', schema);
