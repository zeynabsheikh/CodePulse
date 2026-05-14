const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    codeContent: { type: String, required: true },
    language: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    analysis: [String] 
}, { timestamps: true });

module.exports = mongoose.model('Snippet', snippetSchema);