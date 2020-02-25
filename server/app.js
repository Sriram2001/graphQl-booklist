const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => console.log(error));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server now listening on port: " + PORT);
});
