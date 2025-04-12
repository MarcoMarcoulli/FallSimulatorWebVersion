import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// Tipo per il contesto
interface CanvasContextType {
  ctx: CanvasRenderingContext2D | null;
  setCtx: (ctx: CanvasRenderingContext2D | null) => void;

  initialRadius: number | null;
  setInitialRadius: Dispatch<SetStateAction<number | null>>;

  convexity: 1 | -1 | null;
  setConvexity: Dispatch<SetStateAction<1 | -1 | null>>;
}

// Valore iniziale del contesto
const CanvasContext = createContext<CanvasContextType>({
  ctx: null,
  setCtx: () => {},

  initialRadius: null,
  setInitialRadius: () => {},

  convexity: null,
  setConvexity: () => {},
});

// Provider
interface CanvasProviderProps {
  children: ReactNode;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [initialRadius, setInitialRadius] = useState<number | null>(null);
  const [convexity, setConvexity] = useState<1 | -1 | null>(null);

  return (
    <CanvasContext.Provider
      value={{
        ctx,
        setCtx,
        initialRadius,
        setInitialRadius,
        convexity,
        setConvexity,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// Hook personalizzato
export const useCanvasContext = () => useContext(CanvasContext);
