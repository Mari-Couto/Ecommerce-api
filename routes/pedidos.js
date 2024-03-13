const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidoModelo');


//exibir pedidos
router.get('/', (req, res) => {
    res.status(200).send({
        message: "get funcionando"
    })
});

// Inserir um pedido
router.post('/', (req, res) => {
    res.status(201).send({
        message: "post funcionando"
    })
});

// alterar pedido
router.patch('/', (req, res) =>{
    res.status(202).send({
        message: "patch funcionando"
    })
});

// deletar pedido
router.delete('/', (req, res) => {
    res.status(202).send({
        message: "delete funcionando"
    })
});
module.exports = router;

