// src/components/Layout.tsx
import React from 'react';
import ControlPanel from './components/ControlPanel';
import AnimationLayer from './components/AnimationLayer';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Area dei controlli a sinistra con larghezza fissa */}
      <div className="w-[435px] min-w-[435px] bg-gray-100 p-4">
        <ControlPanel />
      </div>

      {/* Area canvas e animazioni a destra */}
      <div className="flex-1 bg-white relative">
        <AnimationLayer /> {/* <-- questo racchiude sia il canvas che le masse animate */}
      </div>
    </div>
  );
};

export default Layout;
