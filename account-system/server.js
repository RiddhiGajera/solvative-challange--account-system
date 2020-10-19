const express = require('express');
const bodyParser = require('body-parser');

const route = require('./route');
const database = require('./db-connection');

const { config: { port, db } } = require('./config/config');

const server = express();

server.use(bodyParser.json());
route(server);
database.initDb(db);

server.listen(port, () => {
    console.log(`server is listing on port: ${port}`);
});