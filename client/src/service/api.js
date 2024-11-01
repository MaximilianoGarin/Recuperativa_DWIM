import axios from 'axios';

// Configuración de la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000', // URL de mi server.js
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para autenticación
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error en la autenticación:', error);
        throw error;
    }
};

// Función para registro
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
};

export default api;