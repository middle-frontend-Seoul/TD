export type GridRowType = (number | boolean)[];

export type GridType = GridRowType[];

export type GameMapSize = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type GridPosition = {
  x: number;
  y: number;
};

export type GameUIState = {
  isGameEnded: boolean;
  fps: number;
  score: number;
  wave: number;
  lives: number;
};

export type GameUIAction =
  | { type: 'gameOver' }
  | { type: 'setFps'; payload: number }
  | { type: 'setScore'; payload: number }
  | { type: 'setWave'; payload: number }
  | { type: 'setLives'; payload: number };
