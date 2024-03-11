const express = require('express');
const Produto = require('../models/produtoModelo');
const router = express.Router();


//Exibi os produtos
router.get('/', (req, res) => {
  try {
    const produtos = [
      new Produto(1, 'Carrinho', 10.99, 'Descrição do produto 1'),
      new Produto(2, 'Produto 2', 20.49, 'Descrição do produto 2'),
      new Produto(3, 'Produto 3', 5.99, 'Descrição do produto 3')
    ];
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao processar a rota /:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Insirir produto
let idProdutoInserido = 1;
router.post('/', (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ mensagem: "Corpo da solicitação vazio." });
      }
      const { nome, preco, descricao } = req.body;
      
      idProdutoInserido++;
  
      const produtoCriado = {
        id_produtos: idProdutoInserido,
          nome,
          preco,
          descricao
      };

      res.status(201).json({
          mensagem: "Produto inserido com sucesso.",
          produtoCriado: produtoCriado
      });
    } catch (error) {
      console.error('Erro ao processar a rota /:', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
  });

  
  



module.exports = router;