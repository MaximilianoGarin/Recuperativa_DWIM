import React from 'react';

function Boton({ texto, onClick }) {
  return (
    <button onClick={onClick} style={estilosBoton}>
      {texto}
    </button>
  );
}

const estilosBoton = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Boton;