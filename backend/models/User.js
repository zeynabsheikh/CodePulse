const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// PASSWORD HASHING HOOK (Fixed Version)
UserSchema.pre('save', async function() {
    // Agar password change nahi hua toh kuch mat karo
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Async function mein 'next()' call karne ki zaroori nahi hoti
    } catch (err) {
        throw err; 
    }
});

module.exports = mongoose.model('User', UserSchema);