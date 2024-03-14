const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidoModelo');
const mysql = require('../mysql')


//exibir pedidos
router.get('/', (req, res) => {
    try {
        mysql.query('SELECT * FROM ospedidos', (err, results) =>{
            if(err) {
                throw err;
            }
            const pedidos = results.map(item => new Pedido(item.produto_id, item.quantidade));
            res.status(200).json(pedidos);
        });
        
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição'})
    }
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

