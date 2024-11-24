import axios from 'axios';

// Configuración de la instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores globales (opcional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la API:', error);
        return Promise.reject(error);
    }
);

/* ======================
       AUTENTICACIÓN
   ====================== */
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

/* ======================
          TICKETS
   ====================== */
export const sellTicket = async (ticketData) => {
    const response = await api.post('/tickets/sell', ticketData);
    return response.data;
};

export const createAdditionalTicket = async (ticketData) => {
    const response = await api.post('/tickets/sell/additional-ticket', ticketData);
    return response.data;
};

export const DefineTicket = async (ticketData) => {
    const response = await api.post('/tickets/create', ticketData);
    return response.data;
};

/* ======================
         SERVICIOS
   ====================== */
export const DefineService = async (serviceData) => {
    const response = await api.post('/services/create', serviceData);
    return response.data;
};

/* ======================
         INFORMES
   ====================== */
export const generateReport = async () => {
    const response = await api.get('/reports/generate');
    return response.data;
};

export const sendWeeklyReport = async (reportContent) => {
    const response = await api.post('/emails/send-weekly-report', { reportContent });
    return response.data;
};

export const getTickets = async () => {
    const response = await api.get('/tickets');  // Asumimos que tienes esta ruta para obtener los tickets
    return response.data;
};

/* ======================
           VENTAS
   ====================== */
export const registerSale = async (saleData) => {
    const response = await api.post('/sales/register', saleData);
    return response.data;
};

/* ======================
           USUARIOS
   ====================== */
export const getUsers = async () => {
    const response = await api.get('/users');  // Ruta para obtener todos los usuarios
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);  // Ruta para eliminar un usuario por su ID
    return response.data;
};

export default api;
