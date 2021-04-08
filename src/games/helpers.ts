import { GameError } from './game-error';
import { GridType, Position } from './typing';

type GridPosition = {
  width: number;
  offset: number;
};

const GRID_FIRST_ROW = 0;

export const isRadius = (
  point: Position,
  center: Position,
  radius: number
): boolean => {
  return (
    (center.x - point.x) * (center.x - point.x) +
      (center.y - point.y) * (center.y - point.y) <
    radius * radius
  );
};

export const getStartPosition = (grid: GridType, size: number): Position => {
  const { row, cell } = grid.reduce(
    (prev, curr, i) => {
      // eslint-disable-next-line no-param-reassign
      prev.row = curr[prev.cell] ? i : prev.row;
      return prev;
    },
    { row: 0, cell: 0 }
  );

  const x = cell * size - size;
  const y = row * size;
  return { x, y };
};

export const getGridPosition = (
  size: number,
  percent: number
): GridPosition => {
  const width = (size * percent) / 100;
  const offset = Math.floor((size - width) / 2);

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

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = rej;
    image.src = src;
  });
};

export const cloneNode = <T extends Node>(node: T): T => <T>node.cloneNode();
