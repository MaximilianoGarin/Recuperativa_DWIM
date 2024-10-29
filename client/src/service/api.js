// /client/src/service/api.js

import axios from 'axios';

// Configuración de la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', //=> url de mi server.js
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

// Función para obtener usuarios
export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

// Puedes agregar más funciones para otros endpoints según sea necesario

export default api;