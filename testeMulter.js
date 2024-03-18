const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('./multerConfig')

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.status(200).send({ message: 'ola' });
});

router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
        }
        return res.status(200).json({ message: 'Arquivo enviado com sucesso.', file: req.file.filename });
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        return res.status(500).json({ error: 'Erro interno ao processar a requisição.' });
    }
});

module.exports = router;
