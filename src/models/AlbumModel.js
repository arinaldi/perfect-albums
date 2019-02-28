const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  artist: {
    required: true,
    type: String,
  },
  album: {
    required: true,
    type: String,
  },
  cd: {
    required: true,
    type: Boolean,
  },
  aotd: {
    required: true,
    type: Boolean,
  },
  year: {
    type: String,
  },
});

AlbumSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Album', AlbumSchema);
