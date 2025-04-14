// src/App.tsx
import React from 'react';
import { StateProvider } from './context/state/StateProvider';
import { InputProvider } from './context/input/InputProvider';
import { CanvasProvider } from './context/canvas/CanvasProvider';
import { SimulationProvider } from './context/simulation/SimulationProvider';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <StateProvider>
      <InputProvider>
        <CanvasProvider>
          <SimulationProvider>
            <Layout />
          </SimulationProvider>
        </CanvasProvider>
      </InputProvider>
    </StateProvider>
  );
};

export default App;
