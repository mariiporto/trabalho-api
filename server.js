require('dotenv').config();
const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const livroRoutes = require('./routes/livroRoutes');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Livros está no ar! Use a rota /livros para acessar os dados.');
});

app.use('/livros', livroRoutes);

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