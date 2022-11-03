const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  extend type Query {
    author(id: ID!): Author
  }

  type Author {
    id: ID!
    name: String!
    phone: String!
    email: String!
    books: [Book]
  }
`;

exports.resolvers = {
  Query: {
    author: (_, { id }, { authors }) => {
      return authors.find((a) => a.id === id);
    },
  },
  Author: {
    books: () => {},
  },
};
