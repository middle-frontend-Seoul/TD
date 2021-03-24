import React, { FC, CSSProperties } from 'react';
import cn from 'classnames';

import './loading.scss';

export interface ILoadingProps {
  style?: CSSProperties;
  className?: string;
}

export const Loading: FC<ILoadingProps> = ({ className, style }) => {
  const classes = cn('loading', className);
  return (
    <ul className={classes} style={style}>
      <li className="loading_child loading_child-1" />
      <li className="loading_child loading_child-2" />
      <li className="loading_child loading_child-3" />
      <li className="loading_child loading_child-4" />
      <li className="loading_child loading_child-5" />
      <li className="loading_child loading_child-6" />
      <li className="loading_child loading_child-7" />
      <li className="loading_child loading_child-8" />
      <li className="loading_child loading_child-9" />
      <li className="loading_child loading_child-10" />
      <li className="loading_child loading_child-11" />
      <li className="loading_child loading_child-12" />
    </ul>
  );
};

export default Loading;
