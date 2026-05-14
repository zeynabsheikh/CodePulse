const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');
const analyzeCode = require('../utils/analyzer');

router.post('/upload', async (req, res) => {
    try {
        // Fix: Dono possibilities check karein (code ya codeContent)
        // Aapka frontend 'code' bhej raha hai
        const { title, code, codeContent, language } = req.body;
        const finalCode = code || codeContent;

        // 1. Validation: Agar code khali hai toh error dein crash hone ke bajaye
        if (!finalCode) {
            return res.status(400).json({ 
                error: "No code provided for analysis." 
            });
        }

        // 2. Run the analysis logic
        // Pehle check karein ke analyzeCode function ko sahi string mil rahi hai
        const feedback = analyzeCode(finalCode);

        // 3. Create new Snippet document
        const newSnippet = new Snippet({
            title: title || "Untitled Snippet",
            codeContent: finalCode, // Database mein finalCode save karein
            language: language || "javascript",
            author: null, 
            analysis: feedback
        });

        // 4. Save to Database
        await newSnippet.save();

        // 5. Send response back to Frontend
        res.status(201).json({ 
            message: "Snippet uploaded and analyzed!", 
            snippet: newSnippet,
            recommendations: feedback // Frontend ko 'recommendations' field mein data bhejna
        });

    } catch (err) {
        console.error("Backend Error:", err.message);
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

module.exports = router;