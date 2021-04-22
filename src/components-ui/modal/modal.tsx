import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';

export interface IModalProps {
  node?: HTMLElement;
  isOpen?: boolean;
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ isOpen, children, onClose, node }) => {
  if (!isOpen) {
    return null;
  }

  const child = (
    <div className="modal">
      <div className="modal__content">{children}</div>
      <div
        role="none"
        className="modal__background"
        onClick={onClose}
        onKeyDown={onClose}
      />
    </div>
  );

  if (node) {
    return createPortal(child, node);
  }

  return child;
};
