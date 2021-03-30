import React, { FC, ReactNode } from 'react';

export interface IToolsItemProps {
  src: string;
  label: ReactNode;
  footer?: ReactNode;
}

export const ToolsItem: FC<IToolsItemProps> = ({ src, label, footer }) => {
  return (
    <li className="tools-item">
      <img className="tools-item__icon" src={src} alt="tools element" />
      <span className="tools-item__content">{label}</span>
      {footer && <span className="tools-item__footer">{footer}</span>}
    </li>
  );
};
