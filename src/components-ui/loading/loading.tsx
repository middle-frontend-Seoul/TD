import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import './loading.scss';

export interface ILoadingProps {
  style?: HTMLAttributes<HTMLDivElement>;
  className?: string;
}

export const Loading: FC<ILoadingProps> = ({ className, style }) => {
  const classes = cn('loading', className);
  return (
    <div className={classes} style={style}>
      <span className="loading_child loading_child-1" />
      <span className="loading_child loading_child-2" />
      <span className="loading_child loading_child-3" />
      <span className="loading_child loading_child-4" />
      <span className="loading_child loading_child-5" />
      <span className="loading_child loading_child-6" />
      <span className="loading_child loading_child-7" />
      <span className="loading_child loading_child-8" />
      <span className="loading_child loading_child-9" />
      <span className="loading_child loading_child-10" />
      <span className="loading_child loading_child-11" />
      <span className="loading_child loading_child-12" />
    </div>
  );
};

export default Loading;
