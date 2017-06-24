import mongoose from "mongoose";

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

export default mongoose.model("Album", schema);
