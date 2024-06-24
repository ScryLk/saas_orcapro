import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="bg-gray-900 h-screen w-56 flex flex-col">
      <div className="flex flex-col justify-start items-center mt-8 space-y-8">
        <div className="text-white text-2xl font-bold">
          <img src='../src/assets/whiteLogo.svg' alt='logo' className='w-8 h-8' />
        </div>
        <div className="flex flex-col space-y-4 w-full px-4">
          <Link to="/" className="text-white text-sm p-2 rounded-md hover:bg-gray-700">
            Inicio
          </Link>
          <Link to="/clientes" className="text-white text-sm p-2 rounded-md hover:bg-gray-700">
            Colaboradores
          </Link>
          <Link to="/impressoras" className="text-white text-sm p-2 rounded-md hover:bg-gray-700">
            Impressoras
          </Link>
        </div>
      </div>
    </div>
  );
}
