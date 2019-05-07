const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
},
{
  timestamps: true,
});

SongSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Song', SongSchema);
