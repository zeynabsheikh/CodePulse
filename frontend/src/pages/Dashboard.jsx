import React, { useState, useEffect } from 'react';
import { uploadSnippet } from '../services/api';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

const Dashboard = () => {
    // States
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [analysis, setAnalysis] = useState([]); // Analysis results store karne ke liye
    const [loading, setLoading] = useState(false);
    const [typingUser, setTypingUser] = useState('');
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Listen for typing
        socket.on('user_typing', (data) => {
            setTypingUser(data.user);
            setTimeout(() => setTypingUser(''), 3000);
        });

        // Listen for comments
        socket.on('receive_comment', (data) => {
            setComments((prev) => [...prev, data]);
        });

        return () => {
            socket.off('user_typing');
            socket.off('receive_comment');
        };
    }, []);

    // --- New: Logic to call Backend Analysis ---
    const handleAnalyze = async () => {
        if (!code.trim()) return alert("Please enter some code first!");
        
        setLoading(true);
        try {
            // Backend API call using your existing service
            const response = await uploadSnippet({ title, code }); 
            
            // Backend se aane wale recommendations ko state mein set karna
            // Note: Make sure your backend returns an object with a 'recommendations' array
            setAnalysis(response.data.recommendations || ["Code looks structurally sound!"]);
            
            // Notify other users via socket
            socket.emit('new_snippet_analyzed', { title, user: 'Zainab' });

        } catch (err) {
            console.error("Analysis Error:", err);
            alert("Backend error! Check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendComment = () => {
        if (!newComment.trim()) return;
        const commentData = {
            text: newComment.trim(),
            user: 'Zainab', 
            time: new Date().toLocaleTimeString()
        };
        socket.emit('send_comment', commentData);
        setNewComment('');
    };

    return (
        <div style={{ maxWidth: '900px', margin: '30px auto', fontFamily: '"Segoe UI", sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}> CodePulse AI Analyzer</h2>
            
            {typingUser && <p style={{ color: 'green' }}>{typingUser} is typing...</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                <input 
                    type="text" 
                    placeholder="Project Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <textarea 
                    rows="10" 
                    placeholder="Paste your code here..."
                    style={{ padding: '15px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#fff', fontSize: '14px' }}
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        socket.emit('typing', { user: 'Zainab' });
                    }}
                ></textarea>

                {/* --- New: Analyze Button --- */}
                <button 
                    onClick={handleAnalyze} 
                    disabled={loading}
                    style={{ 
                        padding: '12px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 'bold' 
                    }}
                >
                    {loading ? 'Analyzing...' : 'Analyze Code '}
                </button>
            </div>

            {/* --- New: Display Analysis Results --- */}
            {analysis.length > 0 && (
                <div style={{ marginTop: '20px', padding: '20px', background: '#fff', border: '2px solid #007bff', borderRadius: '12px' }}>
                    <h3 style={{ color: '#007bff', marginTop: 0 }}> Analysis Report</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        {analysis.map((item, index) => (
                            <li key={index} style={{ marginBottom: '8px', fontWeight: '500' }}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* LIVE COMMENTS SECTION */}
            <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
                <h3>💬 Live Collaboration</h3>
                <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
                    {comments.map((c, i) => (
                        <div key={i} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
                            <strong>{c.user}:</strong> {c.text}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Type a comment..."
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <button onClick={handleSendComment} style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #007bff', backgroundColor: 'white', color: '#007bff' }}>Post</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;