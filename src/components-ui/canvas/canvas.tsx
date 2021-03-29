import React, { forwardRef } from 'react';

export interface ICanvasProps {
  width?: number | string;
  height?: number | string;
}

export const Canvas = forwardRef(
  ({ width, height }: ICanvasProps, ref: React.Ref<HTMLCanvasElement>) => {
    return <canvas ref={ref} width={width} height={height} />;
  }
);
