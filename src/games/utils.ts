import { GameError } from './game-error';
import { GridType } from './typing';

const GRID_FIRST_ROW = 0;

export const isArray = (val: unknown[]): val is unknown[] | never => {
  if (!Array.isArray(val)) {
    throw new GameError(`${val} не является массивом`);
  }

  return true;
};

type GetGridSizeReturn = { height: number; width: number } | never;

export const getGridSize = (grid: GridType): GetGridSizeReturn => {
  isArray(grid);
  isArray(grid[GRID_FIRST_ROW]);

  const height = grid.length;
  const width = grid[GRID_FIRST_ROW].length;

  if (!height || !width) {
    throw new GameError('Массив Grid должен содержать хотябы один массив');
  }

  return {
    height,
    width,
  };
};
