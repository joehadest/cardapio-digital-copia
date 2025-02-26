const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Simular login para teste
        if (email === "teste@teste.com" && password === "123456") {
            res.json({
                id: 1,
                name: "Usuário Teste",
                email: "teste@teste.com"
            });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Simular registro para teste
        res.json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
