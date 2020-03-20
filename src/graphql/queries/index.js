const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const { SongType } = require('../../types');
const getAllSongs = require('../../controllers/songs/getAll');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    health: {
      type: GraphQLString,
      description: 'Health check for GraphQL API',
      resolve: () => {
        return 'OK';
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      description: 'List of all featured songs',
      resolve: async () => {
        // TODO: test error handling
        const songs = await getAllSongs();
        return songs;
      },
    },
  }),
});

module.exports = { RootQueryType };
