const Book = require("../models/book");
const Author = require("../models/author");
const resolvers = {
    Query : {
        getAllBooks : async () => await Book.find().populate("authorId"),

        getBookById : async(_ , { id }) => await Book.findById(id).populate("authorId"),

        getAllAuthors : async() => await Author.find(),

        getBooksByAuthor : async(_ , { authorId }) => await Book.find({ authorId })
    },

    Mutation : {
        addAuthor : async(_ , { name }) => {
            const author = new Author({ name });
            return await author.save();
        },
        addBook : async(_ , { title , authorId }) => {
            try {
                const book = new Book({ title , authorId });
                await book.save();

                return await Book.findById(book._id).populate("authorId");
            }
            catch(err) {
                throw new Error("Failed to add book!");
            }
        },
        updateBook : async(_ , { id , title }) => {
            return await Book.findByIdAndUpdate(id , { title } , { new : true });
        },
        deleteBook : async(_ , { id }) => {
            await Book.findByIdAndDelete(id);
            return "Book Deleted Successfully";
        }
    }
};

module.exports = resolvers;