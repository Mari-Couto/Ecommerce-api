const express = require('express');
const Produto = require('../models/produtoModelo');
const router = express.Router();
const mysql = require('../mysql');
const multer = require('multer');
const storage = require('../multerConfig')
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const upload = multer({ storage: storage });

//Exibi os produtos
router.get('/', (req, res) => {
  try {
    mysql.query('SELECT * FROM osprodutos', (err, results) => {
      if (err) {
        throw err;
      }
      const produtos = results.map(item => {
       
        const file = item.file ? `uploads/${item.file}` : null;
        return new Produto(item.id, item.nome, item.preco, item.descricao, file);
      });
      res.status(200).json(produtos);
    });
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});


//Teste retorno imagem
router.get('/imagens', (req, res) => {
  try {
    mysql.query('SELECT id FROM osprodutos WHERE file IS NOT NULL', (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return res.status(500).json({ error: 'Erro interno ao processar a requisição' });
      }

      const imageUrls = results.map(result => `/produtos/imagem/${result.id}`);
      res.json(imageUrls);
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});

// Rota para exibir a imagem com o ID correspondente
router.get('/imagem/:id', (req, res) => {
  const id = req.params.id;
  try {
    mysql.query('SELECT file FROM osprodutos WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return res.status(500).json({ error: 'Erro interno ao processar a requisição' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Imagem não encontrada' });
      }

      const imageBuffer = results[0].file;
      sharp(imageBuffer)
        .toFormat('jpeg')
        .toBuffer()
        .then(convertedImageBuffer => {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(convertedImageBuffer);
        })
        .catch(err => {
          console.error('Erro ao converter imagem:', err);
          res.status(500).json({ error: 'Erro interno ao processar a requisição' });
        });
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno ao processar a requisição' });
  }
});




//Inseri os produtos
router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file)
  const produto = req.body; 
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }
    const fileContent = fs.readFileSync(req.file.path);

    mysql.query('INSERT INTO osprodutos (nome, preco, descricao, file) VALUES (?, ?, ?, ?)', 
      [produto.nome, produto.preco, produto.descricao, fileContent], 
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Erro ao inserir produto' });
        } else {
          const novoProdutoId = result.insertId;
          res.status(201).json({ id: novoProdutoId, message: 'Produto inserido com sucesso.' });
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


