const express = require('express');
const Produto = require('../models/produtoModelo');
const router = express.Router();
const mysql = require('../mysql');

//Exibi os produtos
router.get('/', (req, res) => {
  try {
    mysql.query('SELECT * FROM osprodutos', (err, results) => {
      if (err) {
        throw err;
      }
      const produtos = results.map(item => new Produto(item.id, item.nome, item.preco, item.descricao));
      res.status(200).json(produtos);
    });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});


// Inserir produto
router.post('/', (req, res) => {
  const produto = req.body; 
  try {
    mysql.query('INSERT INTO osprodutos (nome, preco, descricao) VALUES (?, ?, ?)', 
      [produto.nome, produto.preco, produto.descricao], 
       (err, result) => {
         if (err) {
          res.status(500).json({ error: 'Erro ao inserir produto' });
        } else {
          const novoProduto = {
            id: result.insertId,
            nome: produto.nome,
            preco: produto.preco,
            descricao: produto.descricao
          };
          res.status(201).json({ message: 'Produto inserido com sucesso', produto: novoProduto });
        }
      });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

  //Alterar produto
  router.patch('/:id', (req, res) => {
 try {
  mysql.query(
     `UPDATE osprodutos
      SET nome = ?,
          preco = ?,
          descricao = ?
    WHERE id = ?`,
 [req.body.nome, req.body.preco, req.body.descricao, req.params.id],
   (err, result) => {
     if (err) {
     res.status(500).json({ error: 'Erro ao atualizar produto' });
      } else {
       if (result.affectedRows > 0) {
         const produtoAtualizado = {
           id: req.params.id,
           nome: req.body.nome,
           preco: req.body.preco,
           descricao: req.body.descricao
          };
     res.status(202).json({ message: 'Produto atualizado com sucesso', produto: produtoAtualizado });
      } else {
     res.status(404).json({ error: 'Produto não encontrado' });
      }}
   }
      );
    } catch (error) {
      console.error('Erro ao processar a rota PATCH /:id', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
  });
  
//deletar um produto
router.delete('/:id', (req, res) => {
  try {
    mysql.query('DELETE FROM osprodutos WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir produto:', err);
        res.status(500).json({ error: 'Erro ao excluir produto' });
      } else {
        res.status(202).json({ message: 'Produto removido com sucesso' });
      }
    });
  } catch (error) {
    console.error('Erro ao processar a rota DELETE /:id', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});


module.exports = router;


