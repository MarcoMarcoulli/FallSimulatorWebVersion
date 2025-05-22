// src/utils/reset.ts
import { UIStates } from '../../types/UIStates';
import { clearCanvas } from '../../logic/utils/CurveVisualizer';

export function resetAll(
  clearInput: () => void,
  clearSimulations: () => void,
  ctx: CanvasRenderingContext2D,
  animationDiv: HTMLDivElement,
  resetButtonsVisibility: () => void,
  resetMasses: () => void,
  setUIState: (state: UIStates) => void
) {
  clearInput();
  clearSimulations();

  clearCanvas(ctx);

  while (animationDiv.firstChild) {
    animationDiv.removeChild(animationDiv.firstChild);
  }

  resetButtonsVisibility();
  resetMasses();

  setUIState(UIStates.CHOOSING_GRAVITY);
}
