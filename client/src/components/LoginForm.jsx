import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm({ onLoginSuccess }) {
  const [id_user, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ id_user, password });
      console.log('Login successful:', data);
      toast.success('Inicio de sesión exitoso');
      onLoginSuccess(data.user);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'Dark'
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ID de Usuario"
              variant="outlined"
              margin="normal"
              value={id_user}
              onChange={(e) => setIdUser(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/user-creation')}
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer theme="dark" />
    </Box>
  );
}