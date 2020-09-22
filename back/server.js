const bodyParser = require('body-parser');
const express = require('express');
const dbRead = require('./config/db.read');

const port = process.env.PORT || 9000;
const app = express();

const cors = require('cors');
app.use(cors())

const fs = require('fs')
const typeDefs = fs.readFileSync('./graphql/schema.graphql',{encoding:'utf-8'})
const resolvers = require('./graphql/resolvers')
// schema와 resolver를 makeExecutableSchema 함수의 인자로 전달한다. 
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(bodyParser.json());
// apollo server express의 모듈을 각 API에 맵핑.
const {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);