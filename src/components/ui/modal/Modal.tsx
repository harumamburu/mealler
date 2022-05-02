import ReactDOM from 'react-dom';

import Card from '../card/Card';
import styles from './Modal.module.css';

const ModalBackdrop = (props: { onClick?: () => void }) => (
  <div className={styles.backdrop} onClick={props.onClick} />
);

const ModalOverlay = (props: { className?: string; children?: React.ReactNode }) => (
  <Card className={`${styles.modal} ${props.className || ''}`}>{props.children}</Card>
);

const Modal = (props: {
  onBackdropClick?: () => void;
  cardClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalBackdrop onClick={props.onBackdropClick} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.cardClassName}>{props.children}</ModalOverlay>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
