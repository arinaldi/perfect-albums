const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  artist: {
    required: true,
    type: String
  },
  album: {
    required: true,
    type: String
  },
  cd: {
    required: true,
    type: Boolean
  },
  aotd: {
    required: true,
    type: Boolean
  }
});

module.exports = mongoose.model('Album', schema);
