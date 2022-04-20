import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import styles from './Modal.module.css';

const ModalBackdrop = (props) => <div className={styles.backdrop} onClick={props.onClick} />;

ModalBackdrop.propTypes = {
  onClick: PropTypes.func,
};

const ModalOverlay = (props) => (
  <Card className={`${styles.modal} ${props.className || ''}`}>{props.children}</Card>
);

ModalOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalBackdrop onClick={props.onBackdropClick} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.cardClassName}>{props.children}</ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

Modal.propTypes = {
  onBackdropClick: PropTypes.func,
  cardClassName: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
