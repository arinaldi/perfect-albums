const getFavorites = require('../controllers/albums/getFavorites');
const getAllReleases = require('../controllers/releases/getAll');
const getAllSongs = require('../controllers/songs/getAll');
const createRelease = require('../controllers/releases/create');
const editRelease = require('../controllers/releases/edit');
const deleteRelease = require('../controllers/releases/delete');
const createSong = require('../controllers/songs/create');
const deleteSong = require('../controllers/songs/delete');
const { ERRORS } = require('../constants');

module.exports = {
  Query: {
    health: () => 'OK',
    favorites: async () => {
      const favorites = await getFavorites();
      return favorites;
    },
    releases: async () => {
      const releases = await getAllReleases();
      return releases;
    },
    songs: async () => {
      const songs = await getAllSongs();
      return songs;
    },
  },
  Mutation: {
    createRelease: async (_, args, ctx) => {
      if (!ctx.isAuthorized) {
        throw new Error(ERRORS.USER.NOT_VALID);
      }
      const newRelease = await createRelease(args);
      return newRelease;
    },
    editRelease: async (_, args, ctx) => {
      if (!ctx.isAuthorized) {
        throw new Error(ERRORS.USER.NOT_VALID);
      }
      const { id, ...data } = args;
      const updatedRelease = await editRelease(id, data);
      return updatedRelease;
    },
    deleteRelease: async (_, args, ctx) => {
      if (!ctx.isAuthorized) {
        throw new Error(ERRORS.USER.NOT_VALID);
      }
      await deleteRelease(args.id);
      return { id: args.id };
    },
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
