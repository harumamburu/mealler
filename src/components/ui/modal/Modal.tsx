import ReactDOM from 'react-dom';

import Card from '../card/Card';
import styles from './Modal.module.css';

const ModalBackdrop: React.FC<{ onClick?: () => void }> = (props) => (
  <div className={styles.backdrop} onClick={props.onClick} />
);

const ModalOverlay: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = (props) => (
  <Card className={`${styles.modal} ${props.className || ''}`}>{props.children}</Card>
);

const Modal: React.FC<{
  onBackdropClick?: () => void;
  cardClassName?: string;
  children?: React.ReactNode;
}> = (props) => {
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
