const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphql = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
});

module.exports = graphql;
