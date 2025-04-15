// src/components/Layout.tsx
import React from 'react';
import ControlPanel from './components/ControlPanel';
import AnimationLayer from './components/AnimationLayer';
import { useWindowResizeReset } from './logic/utils/useWindowResizeReset';

const Layout: React.FC = () => {
  useWindowResizeReset();

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
