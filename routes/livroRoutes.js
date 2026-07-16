const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// CREATE - Cadastrar um novo livro (POST /livros)
router.post('/', async (req, res) => {
  try {
    const novoLivro = new Livro(req.body);
    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// READ - Listar todos os livros (GET /livros)
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// READ - Buscar um livro por ID (GET /livros/:id)
router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.status(200).json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// UPDATE - Atualizar um livro existente (PUT /livros/:id)
router.put('/:id', async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!livroAtualizado) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.status(200).json(livroAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// DELETE - Excluir um livro (DELETE /livros/:id)
router.delete('/:id', async (req, res) => {
  try {
    const livroExcluido = await Livro.findByIdAndDelete(req.params.id);
    if (!livroExcluido) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
