const { gql } = require("graphql-tag");
const typeDefs = gql`
    type Author {
        id : ID!
        name : String!
    }
    type Book {
        id : ID!
        title : String!
        authorId : Author!
    }

    type Query {
        getAllBooks : [Book]
        getBookById(id : ID!) : Book
        getAllAuthors : [Author]
        getBooksByAuthor(authorId : ID!) : [Book]
    }

    type Mutation {
        addAuthor(name : String!) : Author
        addBook(title : String! , authorId : ID!) : Book
        updateBook(id : ID! , title : String , authorId : ID) : Book
        deleteBook(id : ID!) : String
    }
`;

module.exports = typeDefs;