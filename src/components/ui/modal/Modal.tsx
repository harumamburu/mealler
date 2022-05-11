import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';

import Card from '../card/Card';
import ModalContext from '../../../store/modal-context';
import styles from './Modal.module.css';

const ModalBackdrop = (props: { onClick?: () => void; style: React.CSSProperties }) => (
  <div className={styles.backdrop} style={props.style} onClick={props.onClick} />
);

const ModalOverlay = (props: {
  className?: string;
  style: React.CSSProperties;
  children?: React.ReactNode;
}) => (
  <Card className={`${styles.modal} ${props.className || ''}`} style={props.style}>
    {props.children}
  </Card>
);

const Modal = (props: {
  onBackdropClick?: () => void;
  cardClassName?: string;
  children?: React.ReactNode;
}) => {
  const modalCtx = useContext(ModalContext);
  const [zIndex] = useState(modalCtx.zIndex);
  return (
    <>
      {ReactDOM.createPortal(
        <ModalBackdrop onClick={props.onBackdropClick} style={{ zIndex: zIndex }} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.cardClassName} style={{ zIndex: zIndex + 10 }}>
          {props.children}
        </ModalOverlay>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
