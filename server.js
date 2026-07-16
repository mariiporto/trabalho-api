require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const livroRoutes = require('./routes/livroRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Rota raiz, só para conferir se a API está rodando
app.get('/', (req, res) => {
  res.send('API de Livros está no ar! Use a rota /livros para acessar os dados.');
});

// Todas as rotas de livros ficam sob o prefixo /livros
app.use('/livros', livroRoutes);

// Conecta ao MongoDB Atlas e só sobe o servidor se a conexão der certo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });
