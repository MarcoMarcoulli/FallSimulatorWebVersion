// src/components/Layout.tsx
import React from 'react';
import ControlPanel from './components/ControlPanel';
import Canvas from './components/Canvas';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Area dei controlli a sinistra con larghezza fissa */}
      <div className="w-[435px] min-w-[435px] bg-gray-100 p-4">
        <ControlPanel />
      </div>

      {/* Area canvas a destra che occupa lo spazio rimanente */}
      <div className="flex-1 bg-white relative">
        <Canvas />
      </div>
    </div>
  );
};

export default Layout;
