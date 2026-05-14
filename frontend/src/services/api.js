import axios from 'axios';

// Backend API Base URL
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auth Services
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Snippet Services
export const uploadSnippet = (snippetData) => API.post('/snippets/upload', snippetData);