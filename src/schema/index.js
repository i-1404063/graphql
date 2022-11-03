const { gql } = require("apollo-server-express");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs: Author, resolvers: AuthorResolver } = require("./author");
const { typeDefs: Book, resolvers: BookResolver } = require("./book");

/*
  Scalar Types
  String, Int, Float, Boolean, ID
**/

const Query = gql`
  type Query {
    _empty: String
  }
`;

const resolvers = {};

exports.schema = makeExecutableSchema({
  typeDefs: [Query, Book, Author],
  resolvers: merge(resolvers, AuthorResolver, BookResolver),
});
