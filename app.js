const express = require('express');
const app = express();
const morgan = require('morgan');
const rotaRouter = require('./testeMulter')
const produtoRouter = require('./routes/produtos');
const pedidoRouter = require('./routes/pedidos');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/produtos', produtoRouter);
app.use('/pedidos', pedidoRouter);
app.use('/upload', rotaRouter)

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