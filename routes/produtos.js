const express = require('express');
const Produto = require('../models/produtoModelo');
const router = express.Router();
const mysql = require('../mysql');

//Exibi os produtos
mysql.query(
  'SELECT * FROM osprodutos',
  (err, results, fields) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return;
    }
    console.log('Resultados da consulta:', results);
    console.log('Campos da consulta:', fields);
  }
);

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
        id_produto: idProdutoInserido,
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

  //Alterar produto
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;

    const osprodutos = [
      new Produto(1, 'Carrinho', 10.99, 'Descrição do produto 1'),
      new Produto(2, 'Produto 2', 20.49, 'Descrição do produto 2'),
      new Produto(3, 'Produto 3', 5.99, 'Descrição do produto 3')
    ];

    const produtoIndex = osprodutos.findIndex(item => item.id === parseInt(id));
    if (produtoIndex === -1) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    if (nome) osprodutos[produtoIndex].nome = nome;
    if (preco) osprodutos[produtoIndex].preco = preco;
    if (descricao) osprodutos[produtoIndex].descricao = descricao;

    const produtoAtualizado = osprodutos[produtoIndex];
    res.status(200).json({ mensagem: "Produto atualizado com sucesso", produto: produtoAtualizado });
  } catch (error) {
    console.error('Erro ao processar a rota PATCH /:id', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

//deletar um produto
router.delete('/:id', (req, res) => {
  try {
    const {id} = req.params;

    const osprodutos = [
      new Produto(1, 'Carrinho', 10.99, 'Descrição do produto 1'),
      new Produto(2, 'Produto 2', 20.49, 'Descrição do produto 2'),
      new Produto(3, 'Produto 3', 5.99, 'Descrição do produto 3')
    ];

    const produtoIndex = osprodutos.findIndex(item => item.id === parseInt(id));
    if(produtoIndex === -1) {
      return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    osprodutos.splice(produtoIndex, 1);

    res.status(200).json({ mensagem: "Produto removido com sucesso"});
  } catch (error) {
    console.error('Erro ao processar a rota DELETE /:id', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});
  



module.exports = router;


