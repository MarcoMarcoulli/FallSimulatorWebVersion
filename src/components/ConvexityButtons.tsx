import React from 'react';
import { useInputContext } from '../context/input/useInputContext';
import { useCanvasContext } from '../context/canvas/useCanvasContext';
import { useStateContext } from '../context/state/useStateContext';
import { Circle } from '../logic/curves/Circle';
import { drawCurve } from '../logic/utils/CurveVisualizer';
import { SimulationManager } from '../logic/simulation/SimulationManager';
import { addSimulation } from '../logic/simulation/Simulations';
import { UIStates } from '../types/UIStates';

interface ConvexityButtonProps {
  convexity: 1 | -1;
}

const ConvexityButton: React.FC<ConvexityButtonProps> = ({ convexity }) => {
  const { startPoint, endPoint } = useInputContext();
  const { ctx } = useCanvasContext();
  const { setUIState } = useStateContext();

  // Stato per memorizzare il raggio iniziale da passare a RadiusSlider
  const { setRadius, setConvexity } = useInputContext();

  const handleClick = () => {
    if (!startPoint || !endPoint || !ctx) return;

    // 1. Crea la circonferenza iniziale (Circle) usando i punti e la convexity
    const circle = new Circle(startPoint, endPoint, convexity);
    circle.setRandomColors();

    // 2. Crea la simulazione e aggiungila alla lista delle simulazioni
    const simulation = new SimulationManager(circle);
    addSimulation(simulation);
    // (Eventuale: aggiungi observer se necessario)

    // 3. Ottieni i punti e i colori della circonferenza dalla simulazione
    const points = simulation.getPoints();
    const red = simulation.getCurve().getRed();
    const green = simulation.getCurve().getGreen();
    const blue = simulation.getCurve().getBlue();

    // 4. Disegna la circonferenza sul canvas
    drawCurve(points, ctx, red, green, blue);

    // 5. Calcola il raggio iniziale.
    // Assumiamo che circle.getR() restituisca il raggio della circonferenza.
    let computedRadius = circle.getR();
    if (convexity === 1) {
      // Se la convexity è "up", correggi il segno in base alla differenza orizzontale
      const deltaX = endPoint.x - startPoint.x;
      computedRadius = (deltaX / Math.abs(deltaX)) * computedRadius;
    }
    // Imposta il raggio iniziale nello stato
    setRadius(computedRadius);
    setConvexity(convexity);
    // 6. Transizione dello stato dell'interfaccia a CHOOSING_RADIUS
    setUIState(UIStates.CHOOSING_RADIUS);
  };

  const label = convexity === 1 ? 'Convessità ↑' : 'Convessità ↓';
  const buttonColor =
    convexity === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700';

  return (
    <div>
      <button onClick={handleClick} className={`${buttonColor} text-white px-3 py-1 rounded`}>
        {label}
      </button>
    </div>
  );
};

export default ConvexityButton;
