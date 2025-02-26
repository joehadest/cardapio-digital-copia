const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Rota de registro
app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name],
            (err) => {
                if (err) {
                    res.status(400).json({ error: 'Email já existe' });
                } else {
                    res.json({ message: 'Usuário registrado com sucesso' });
                }
            });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Erro no servidor' });
        } else if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({
                    id: user.id,
                    email: user.email,
                    name: user.name
                });
            } else {
                res.status(401).json({ error: 'Senha incorreta' });
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
