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
      toast.success('Inicio de sesión exitoso');
      onLoginSuccess(data.user);
    } catch (error) {
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
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)', // Fondo con gradiente
        padding: '2rem'
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 8, boxShadow: 10, padding: '2rem' }}>
        <CardContent>
          {/* Título "Gestión de Tickets" con color más oscuro */}
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)', // Sombra para el texto
              fontSize: '2.5rem', // Tamaño de la fuente ajustado
              letterSpacing: '1px', // Un poco de espacio entre letras
              color: '#5a4e91', // Nuevo color más oscuro (tono morado más profundo)
            }}
          >
            Gestión de Tickets
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom align="center" color="#ffffff">
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
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  backgroundColor: '#f1f1f1',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f94fb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4e54c8',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4e54c8',
                  },
                },
              }}
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
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                '& .MuiInputBase-root': {
                  backgroundColor: '#f1f1f1',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f94fb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4e54c8',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4e54c8',
                  },
                },
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{
                mt: 2, 
                borderRadius: 2, 
                backgroundColor: '#4e54c8',
                '&:hover': {
                  backgroundColor: '#8f94fb',
                },
                padding: '10px',
                fontWeight: 600,
              }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              fullWidth 
              sx={{
                mt: 2, 
                borderRadius: 2, 
                borderColor: '#8f94fb', 
                color: '#8f94fb',
                '&:hover': {
                  backgroundColor: '#8f94fb',
                  color: '#ffffff',
                },
              }}
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
