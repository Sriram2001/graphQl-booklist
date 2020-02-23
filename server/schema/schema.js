const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// Dummy data
let books = [
  {
    name: "Harry Potter and the Philosopher's Stone",
    genre: "Magic",
    id: "1",
    authorId: "1"
  },
  {
    name: "Harry Potter and the Deathly Hallows",
    genre: "Magic",
    id: "2",
    authorId: "1"
  },
  {
    name: "Percy Jackson and the Last Olympian",
    genre: "Mythology",
    id: "3",
    authorId: "2"
  },
  {
    name: "The House of Hades",
    genre: "Mythology",
    id: "4",
    authorId: "2"
  },
  {
    name: "Angels and Deamons",
    genre: "Mystery",
    id: "5",
    authorId: "3"
  },
  {
    name: "DaVinci Code",
    genre: "Mystery",
    id: "6",
    authorId: "3"
  }
];

let authors = [
  {
    name: "J K Rowling",
    age: "54",
    id: "1"
  },
  {
    name: "Rick Riodan",
    age: "55",
    id: "2"
  },
  {
    name: "Dan Brown",
    age: "55",
    id: "3"
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
