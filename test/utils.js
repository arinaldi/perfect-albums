const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('../src/graphql/schema');
const resolvers = require('../src/graphql/resolvers');

let schema;

const gqlCall = (options) => {
  const { source, variableValues, isAuthorized } = options;

  if (!schema) {
    schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: { isAuthorized },
    },
  });
};

module.exports = { gqlCall };
