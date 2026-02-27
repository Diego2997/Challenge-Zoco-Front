import React from 'react';

const drawerWidth = 240;

export const AppBar = ({ open, children, className = '' }) => {
  return (
    <header
      className={`
        fixed top-0 right-0 bg-white shadow-sm border-b border-gray-200
        transition-all duration-300 ease-in-out
        z-20
        ${className}
      `}
      style={{
        left: open ? `${drawerWidth}px` : '64px',
        width: open 
          ? `calc(100% - ${drawerWidth}px)` 
          : 'calc(100% - 64px)',
      }}
    >
      {children}
    </header>
  );
};