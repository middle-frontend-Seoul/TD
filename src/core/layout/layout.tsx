import React, { FC } from 'react';

import './layout.scss';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
