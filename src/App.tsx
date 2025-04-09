// src/App.tsx
import React from 'react';
import { StateProvider } from './context/StateContext';
import { InputProvider } from './context/InputContext';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <StateProvider>
      <InputProvider>
        <Layout />
      </InputProvider>
    </StateProvider>
  );
};

export default App;
