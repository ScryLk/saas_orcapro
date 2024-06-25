import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [selected, setSelected] = useState('/');
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/clientes', label: 'Colaboradores' },
    { path: '/impressoras', label: 'Impressoras' },
  ];

  return (
    <div className="bg-gray-900 h-screen w-56 flex flex-col">
      <div className="flex flex-col justify-start items-center mt-8 space-y-8">
        <div className="text-white text-2xl font-bold">
          <img src='../src/assets/whiteLogo.svg' alt='logo' className='w-8 h-8' />
          <img src='../src/assets/whiteLogo.svg' alt='logo' className='w-8 h-8' />
        </div>
        <div className="flex flex-col space-y-4 w-full px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-white text-sm p-2 rounded-md ${location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setSelected(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
