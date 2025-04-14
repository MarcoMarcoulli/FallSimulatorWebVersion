// src/components/Layout.tsx
import React from 'react';
import ControlPanel from './components/ControlPanel';
import AnimationLayer from './components/AnimationLayer';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[450px] min-w-[435px] bg-gray-100 p-4">
        <ControlPanel />
      </div>

      <div className="flex-1 bg-white relative">
        <AnimationLayer />
      </div>
    </div>
  );
};

export default Layout;
