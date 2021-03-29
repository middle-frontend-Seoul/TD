import React, { FC } from 'react';

import './modal.scss';

export interface IModalProps {
  open?: boolean;
  onClose?: () => void;
}

export const Modal: FC<IModalProps> = ({ open, children, onClose }) => {
  if (!open) return null;

  const handleOnClose = () => onClose?.();

  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
      <div
        role="none"
        className="modal__background"
        onClick={handleOnClose}
        onKeyDown={handleOnClose}
      />
    </div>
  );
};
