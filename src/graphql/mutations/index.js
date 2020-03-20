const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const { SongType } = require('../../types');
const createSong = require('../../controllers/songs/create');
const deleteSong = require('../../controllers/songs/delete');
const { ERRORS } = require('../../constants');

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createSong: {
      type: SongType,
      description: 'Add a featured song',
      args: {
        artist: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        link: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.isAuthorized) {
          throw new Error(ERRORS.USER.NOT_VALID);
        }
        const newSong = await createSong(args);
        return newSong;
      },
    },
    deleteSong: {
      type: SongType,
      description: 'Delete a featured song',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.isAuthorized) {
          throw new Error(ERRORS.USER.NOT_VALID);
        }
        await deleteSong(args.id);
        return { id: args.id };
      },
    },
  }),
});

module.exports = { RootMutationType };
