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
  graphiql: true,
});

module.exports = graphql;
