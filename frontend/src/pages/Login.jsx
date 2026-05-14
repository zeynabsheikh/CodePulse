import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser(formData);
        
        console.log("Full Backend Response:", response.data);
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log("Token saved successfully!");
            alert("Login Successful!");
            navigate('/'); 
        } else {
            console.error("Token missing in response!");
        }
    } catch (err) {
        console.error("Login Error:", err.response?.data);
        alert(err.response?.data?.message || "Invalid Credentials");
    }
};

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
                <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;