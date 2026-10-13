require('dotenv').config();
const express = require('express');
const cors = require('cors');
const catRoutes = require('./routes/catRoutes');
const projectRoutes = require('./routes/projectRoutes');
const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da ONG Almas de Gato rodando!' });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/cats', catRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'O corpo da requisição contém JSON inválido.' });
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) {
    console.error('Erro interno da API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
  return res.status(status).json({ error: error.message });
});

module.exports = app;
