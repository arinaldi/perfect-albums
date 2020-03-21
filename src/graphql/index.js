const { GraphQLSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const { RootQueryType } = require('./queries');
const { RootMutationType } = require('./mutations');

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const graphql = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
});

module.exports = graphql;
