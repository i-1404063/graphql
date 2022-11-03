const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  extend type Query {
    book(id: ID!): Book
    books: [Book!]!
  }

  type Book {
    id: ID!
    name: String!
    author: Author
  }

  type Mutation {
    createBook(name: String!): Book
  }

  type Subscription {
    createBook: Book
  }
`;

exports.resolvers = {
  Query: {
    book: (_, { id }, { books }) => {
      return books.find((b) => b.id === id);
    },

    books: (_, args, { books }) => {
      return books;
    },
  },
  Book: {
    author: () => {},
  },
  Mutation: {
    createBook: (parent, args, { books, pubsub }) => {
      pubsub.publish("BOOK_CREATED", {
        createBook: { id: "2", name: args.name },
      });
      books.push({ id: "2", name: args.name });
      return books[1];
    },
  },
  Subscription: {
    createBook: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(["BOOK_CREATED"]);
      },
    },
  },
};
