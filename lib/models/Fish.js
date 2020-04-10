const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  }
});

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

schema.statics.getFishByMonth = function(startMonth, endMonth) {
  return this.aggregate([
    {
      '$match': {
        'season.start': {
          '$lte': startMonth
        }, 
        'season.end': {
          '$gte': endMonth
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Fish', schema);
