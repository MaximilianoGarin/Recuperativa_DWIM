import axios from 'axios';

// Configuración de la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:5000',
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

// Función para vender tickets
export const sellTicket = async (ticketData) => {
    try {
        const response = await api.post('/tickets/sell', ticketData);
        return response.data;
    } catch (error) {
        console.error('Error al vender ticket:', error);
        throw error;
    }
};

// Función para generar informes
export const generateReport = async () => {
    try {
        const response = await api.get('/reports/generate');
        return response.data;
    } catch (error) {
        console.error('Error al generar el informe:', error);
        throw error;
    }
};

// Función para crear tickets adicionales
export const createAdditionalTicket = async (ticketData) => {
    try {
        const response = await api.post('/tickets/sell/additional', ticketData);
        return response.data;
    } catch (error) {
        console.error('Error al vender ticket adicional:', error);
        throw error;
    }
};

// Función para registrar ventas
export const registerSale = async (saleData) => {
    try {
        const response = await api.post('/sales/register', saleData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        throw error;
    }
};

// Función para enviar informes semanales
export const sendWeeklyReport = async () => {
    try {
        const response = await api.post('/emails/send-weekly-report');
        return response.data;
    } catch (error) {
        console.error('Error al enviar el informe semanal:', error);
        throw error;
    }
};

export default api;