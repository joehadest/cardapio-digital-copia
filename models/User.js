const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt
});

// Verificar se o modelo já existe antes de criar
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
