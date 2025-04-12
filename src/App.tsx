// src/App.tsx
import React from 'react';
import { StateProvider } from './context/StateContext';
import { InputProvider } from './context/InputContext';
import Layout from './Layout';
import { CanvasProvider } from './context/CanvasContext';

const App: React.FC = () => {
  return (
    <StateProvider>
      <InputProvider>
        <CanvasProvider>
          <Layout />
        </CanvasProvider>
      </InputProvider>
    </StateProvider>
  );
};

export default App;
