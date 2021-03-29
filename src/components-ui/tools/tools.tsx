import React, { FC } from 'react';

import './style.scss';

export const Tools: FC = ({ children }) => {
  return <ul className="tools">{children}</ul>;
};
