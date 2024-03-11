const express = require('express');
const Produto = require('../models/produtoModelo');
const router = express.Router();

router.get('/produtos', (req, res) => {
    const produtos = [
        new Produto(1, 'Produto 1', 10.99, 'Descrição do produto 1'),
        new Produto(2, 'Produto 2', 20.49, 'Descrição do produto 2'),
        new Produto(3, 'Produto 3', 5.99, 'Descrição do produto 3')
      ];
      res.json(produtos);
});

module.exports = router;