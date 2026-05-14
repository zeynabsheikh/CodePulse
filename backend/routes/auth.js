const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    console.log("Registration Request Body:", req.body); // Terminal check karne ke liye
    try {
        const { username, email, password } = req.body;

        // Check karein agar user pehle se maujood hai
        let userExists = await User.findOne({ email });
        if (userExists) {
            console.log("Email already exists in DB");
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Naya user create karein
        const newUser = new User({ username, email, password });
        await newUser.save();

        console.log("User successfully saved to MongoDB!");
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.log("DETAILED REGISTER ERROR:", err); // Ye line terminal mein asli masla batayegi
        res.status(500).json({ error: err.message });
    }
});

// --- 2. LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.log("DETAILED LOGIN ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;