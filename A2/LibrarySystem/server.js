const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");

const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");
const connectDB = require("./config/db");
const app = express();
app.use(cors());
app.use(bodyParser.json());


// connect to mongoDB : 
connectDB();

// Starting the apollo server : 
async function startApolloServer() {
    const server = new ApolloServer({ typeDefs , resolvers });
    await server.start();
    app.use("/graphql" , express.json() , expressMiddleware(server));


    // starting express server : 
    app.listen(4000 , () => {
        console.log(`🚀 Server running at http://localhost:4000/graphql`);
    });
}

startApolloServer();