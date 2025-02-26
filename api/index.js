require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./auth');
const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Middleware básico
app.use(express.json());
app.use(express.static('.'));

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Rota de saúde para teste
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Usar rotas de autenticação
app.use('/api/auth', authRoutes);

// Handler para erros
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Exportar para Vercel
module.exports = app;