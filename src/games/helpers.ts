import { GameError } from './game-error';
import { GridType, Position } from './typing';

type GridPosition = {
  width: number;
  offset: number;
};

const GRID_FIRST_ROW = 0;

export const getDistanceSquared = (
  position1: Position,
  position2: Position
) => {
  const deltaX = position1.x - position2.x;
  const deltaY = position1.y - position2.y;
  return deltaX * deltaX + deltaY * deltaY;
};

export const getStartPosition = (
  grid: GridType,
  tileSize: number
): Position => {
  const { row, cell } = grid.reduce(
    (prev, curr, i) => {
      // eslint-disable-next-line no-param-reassign
      prev.row = curr[prev.cell] ? i : prev.row;
      return prev;
    },
    { row: 0, cell: 0 }
  );

  const x = cell * tileSize - tileSize;
  const y = row * tileSize;
  return { x, y };
};

export const getEndPosition = (grid: GridType, tileSize: number): Position => {
  const { row, cell } = grid.reduce(
    (prev, curr, i) => {
      // eslint-disable-next-line no-param-reassign
      prev.row = curr[prev.cell] ? i : prev.row;
      return prev;
    },
    { row: 0, cell: tileSize - 1 }
  );

  const x = cell * tileSize + tileSize;
  const y = row * tileSize;
  return { x, y };
};

export const getGridPosition = (
  tileSize: number,
  procent: number
): GridPosition => {
  const width = (tileSize * procent) / 100;
  const offset = Math.floor((tileSize - width) / 2);

  return {
    width,
    offset,
  };
};

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
