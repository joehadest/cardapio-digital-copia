const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
        console.log('Iniciando registro de usuário:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('Dados incompletos:', { name, email, password: '***' });
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Verificar se usuário já existe
        console.log('Verificando se email já existe:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email já cadastrado:', email);
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Hash da senha
        console.log('Gerando hash da senha...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        console.log('Criando novo usuário...');
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        console.log('Salvando usuário no banco...');
        await user.save();
        console.log('Usuário registrado com sucesso:', { name, email });

        res.json({
            message: 'Usuário registrado com sucesso',
            user: {
                name,
                email
            }
        });
    } catch (error) {
        console.error('Erro detalhado no registro:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({
            error: 'Erro no servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
