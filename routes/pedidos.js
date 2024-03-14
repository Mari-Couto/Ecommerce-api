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
    const { produto_id, quantidade } = req.body;

    try {
    if (!produto_id || !quantidade) {
        throw new Error('O id do produto e a quantidade são obrigatórios');
    }
    mysql.query('SELECT id FROM osprodutos WHERE id = ?', [produto_id], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            throw new Error(`O produto com o id ${produto_id} não foi encontrado`);
        }
        mysql.query('INSERT INTO ospedidos (produto_id, quantidade) VALUES (?, ?)', [produto_id, quantidade], (err, result) => {
            if (err) {
                throw err;
            }
            console.log('Novo pedido inserido com sucesso:', { produto_id, quantidade });
            res.status(201).json({ message: 'Pedido criado com sucesso', produto_id, quantidade });
        });
    });
    } catch (error) {
        console.error('Erro ao criar o pedido:', error);
        res.status(400).json({ error: error.message });
    }
});

// alterar pedido
router.patch('/:id', (req, res) => {
    const pedidoId = req.params.id;
    const { quantidade } = req.body;

    try {
        if (!quantidade) {
            throw new Error('A quantidade é obrigatória para a alteração do pedido');
        }

        mysql.query('UPDATE ospedidos SET quantidade = ? WHERE produto_id = ?', [quantidade, pedidoId], (err, result) => {
            if (err) {
                throw err;
            }
            
            if (result.affectedRows === 0) {
                throw new Error(`Pedido com o ID ${pedidoId} não encontrado`);
            }
            res.status(202).json({ message: 'Pedido atualizado com sucesso', produto_id: pedidoId, quantidade });
        });
    } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
        res.status(400).json({ error: error.message });
    }
});


// deletar pedido
router.delete('/:id', (req, res) => {
    try {
        mysql.query('SELECT * FROM osprodutos WHERE id = ?', [req.params.id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar produto:', err);
                res.status(500).json({ error: 'Erro ao buscar produto' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Produto não encontrado' });
                return;
            }
            mysql.query('DELETE FROM ospedidos WHERE produto_id = ?', [req.params.id], (err, result) => {
                if (err) {
                    console.error('Erro ao excluir pedido:', err);
                    res.status(500).json({ error: 'Erro ao excluir pedido' });
                } else {
                    res.status(202).json({ message: 'Pedido removido com sucesso' });
                }
            });
        });
    } catch (error) {
        console.error('Erro ao processar a rota DELETE /:id', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});


  
module.exports = router;

