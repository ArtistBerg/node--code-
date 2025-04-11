const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

// express app
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
// listening to server
app.listen(7000, () => {
  console.log("Running GraphQl server...");
});
