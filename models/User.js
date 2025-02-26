const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [{
        street: String,
        number: String,
        complement: String,
        district: String,
        reference: String
    }],
    orders: [{
        items: Array,
        total: Number,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);
