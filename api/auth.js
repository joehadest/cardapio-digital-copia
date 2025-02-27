const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose'); // Adicionar esta linha

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Rota de registro com mais logs
router.post('/register', async (req, res) => {
    try {
        console.log('Iniciando registro:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Verificar conexão com banco
        if (mongoose.connection.readyState !== 1) {
            console.error('Banco de dados não conectado');
            return res.status(500).json({ error: 'Erro de conexão com banco de dados' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso'
        });
    } catch (error) {
        console.error('Erro completo:', error);

        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        res.status(500).json({
            error: 'Erro no servidor',
            message: error.message
        });
    }
});

// Adicionar nova rota para listar usuários
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclui o campo password
        res.json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

module.exports = router;
