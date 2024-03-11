const express = require('express');
const app = express();
const produtoRouter = require('./routes/produtos');


app.use('/', produtoRouter);

module.exports = app;