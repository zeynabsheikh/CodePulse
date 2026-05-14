import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Form Data:", formData);
        const res = await registerUser(formData);
        alert("Registration Successful!");
        navigate('/login');
    } catch (err) {
        // YE LINES ASLI ERROR BATAYENGI
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.error("Full Error:", err);
        
        alert(err.response?.data?.message || "Check Console for Error");
    }
};

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    required
                    style={{ padding: '10px' }}
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    required
                    style={{ padding: '10px' }}
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    style={{ padding: '10px' }}
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;