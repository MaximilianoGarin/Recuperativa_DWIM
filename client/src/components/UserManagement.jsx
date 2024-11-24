import React, { useState, useEffect } from 'react';
import { getUsers } from '../service/api';  // Asegúrate de que tienes esta función en tu API

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();  // Obtener usuarios desde la API
        if (Array.isArray(usersData)) {
          setUsers(usersData);  // Si es un array, establecerlo
        } else {
          console.error('Los datos de los usuarios no son un array:', usersData);
          setUsers([]);  // Si no es un array, establecer un array vacío
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setUsers([]);  // Si ocurre un error, establecer un array vacío
      } finally {
        setLoading(false);  // Dejar de cargar después de la respuesta
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-management-container">
      <h2>Gestión de Usuarios</h2>
      
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div>
          {Array.isArray(users) && users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se encontraron usuarios.</p>
          )}
        </div>
      )}
    </div>
  );
}