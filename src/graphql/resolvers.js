const getAllSongs = require('../controllers/songs/getAll');
const createSong = require('../controllers/songs/create');
const deleteSong = require('../controllers/songs/delete');
const { ERRORS } = require('../constants');

module.exports = {
  Query: {
    health: () => 'OK',
    songs: async () => {
      const songs = await getAllSongs();
      return songs;
    },
  },
  Mutation: {
    createSong: async (_, args, ctx) => {
      if (!ctx.isAuthorized) {
        throw new Error(ERRORS.USER.NOT_VALID);
      }
      const newSong = await createSong(args);
      return newSong;
    },
    deleteSong: async (_, args, ctx) => {
      if (!ctx.isAuthorized) {
        throw new Error(ERRORS.USER.NOT_VALID);
      }
      await deleteSong(args.id);
      return { id: args.id };
    },
  },
};
