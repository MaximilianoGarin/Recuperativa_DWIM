// /client/src/components/Auth.js

import React, { useState } from 'react';
import { register, login } from '../service/api';

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await register({ name, email, password });
            setMessage(response.message);
        } catch (error) {
            setMessage('Error en el registro');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            setMessage(response.message);
        } catch (error) {
            setMessage('Error en la autenticación');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>

            <h2>Login</h2>
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Auth;