const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const SongType = new GraphQLObjectType({
  name: 'Song',
  description: 'This represents a featured song',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    artist: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    link: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { SongType };
