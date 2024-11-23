import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(null);

  // Color palette following design system
  const colors = {
    primary: '#0066cc',
    secondary: '#4c9aff',
    accent: '#00875a',
    neutral: '#172b4d',
    success: '#36b37e',
    warning: '#ffab00',
    error: '#ff5630',
  };

  // Content sections for the 6-channel responsive design
  const sections = [
    {
      title: 'Servicios',
      description: 'Gestión de servicios disponibles',
      color: colors.primary,
    },
    {
      title: 'Vales',
      description: 'Administración de vales y tickets',
      color: colors.secondary,
    },
    {
      title: 'Usuarios',
      description: 'Control de perfiles y accesos',
      color: colors.accent,
    },
    {
      title: 'Reportes',
      description: 'Generación de informes',
      color: colors.success,
    },
    {
      title: 'Auditoría',
      description: 'Sistema de auditoría y control',
      color: colors.warning,
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      color: colors.neutral,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Color Bar - Implementing color design requirement */}
      <div className="mb-8 flex gap-2 p-4 bg-white rounded-lg shadow-sm">
        {Object.entries(colors).map(([name, color]) => (
          <div
            key={name}
            className="flex-1 h-8 rounded transition-transform hover:scale-105"
            style={{ backgroundColor: color }}
            title={name}
          />
        ))}
      </div>

      {/* Grid System Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sections.map((section) => (
          <Card
            key={section.title}
            className={`
              p-6 
              transition-all 
              duration-300 
              hover:shadow-lg 
              ${activeSection === section.title ? 'ring-2 ring-blue-500' : ''}
            `}
            onClick={() => setActiveSection(section.title)}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{section.description}</p>
              <div className="flex justify-between items-center">
                <Badge
                  style={{ backgroundColor: section.color }}
                  className="text-white hover:opacity-90"
                >
                  {section.title}
                </Badge>
                <Button
                  className="transition-colors hover:bg-blue-600"
                  variant="outlined"
                >
                  Gestionar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Symmetrical Distribution & Graphic Rhythm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Panel Principal</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-8 bg-gray-100 rounded animate-pulse"
                style={{
                  width: `${100 - item * 20}%`,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            ))}
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4">Resumen</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <div className="h-4 w-4 rounded-full bg-blue-500 opacity-75" />
                <div className="h-4 bg-gray-100 rounded flex-grow" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}