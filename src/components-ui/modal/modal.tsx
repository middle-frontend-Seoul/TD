import React, { FC } from 'react';

import './modal.scss';

export interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ isOpen, children, onClose }) => {
  return isOpen ? (
    <div className="modal">
      <div className="modal__content">{children}</div>
      <div
        role="none"
        className="modal__background"
        onClick={onClose}
        onKeyDown={onClose}
      />
    </div>
  ) : null;
};
