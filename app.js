const express = require('express');
const morgan = require('morgan');
const produtoRouter = require('./routes/produtos');
const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/produtos', produtoRouter);

app.use((req, res, next) => {
    const error = new Error('Rota não encontrada');
    error.status = 404;
    next(error);
});
  

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});
  

module.exports = app;