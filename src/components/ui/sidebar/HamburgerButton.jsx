import React from 'react';
import { Menu } from 'lucide-react';

export const HamburgerButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors md:hidden"
      aria-label="Abrir menú"
    >
      <Menu className="w-6 h-6 text-gray-700" />
    </button>
  );
};