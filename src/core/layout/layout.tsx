import React, { FC, ReactNode } from 'react';

import './layout.scss';

export interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
