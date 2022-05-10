import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import { faDoorOpen, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalContext from '../../../store/modal-context';
import styles from './ProfileControls.module.css';

const ProfileControls = () => {
  const authCtx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    if (!isAnimated) {
      return;
    }
    const animationTimout = setTimeout(() => setIsAnimated(false), 100);
    return () => clearTimeout(animationTimout);
  }, [isAnimated]);

  return (
    <>
      {!authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated ? styles.press : ''}`}
          size="2x"
          icon={faDoorOpen}
          onPointerDown={() => setIsAnimated(true)}
          onClick={() => modalCtx.setModal('signin', true)}
        />
      )}
      {authCtx.userId && (
        <Link to="/profile" className={styles.icon}>
          <FontAwesomeIcon
            className={isAnimated ? styles.press : ''}
            size="2x"
            icon={faUser}
            onPointerDown={() => setIsAnimated(true)}
          />
        </Link>
      )}
      {authCtx.userId && (
        <Link to="/" className={styles.icon}>
          <FontAwesomeIcon
            className={isAnimated ? styles.press : ''}
            size="2x"
            icon={faDoorClosed}
            onPointerDown={() => setIsAnimated(true)}
            onClick={() => authCtx.logout()}
          />
        </Link>
      )}
    </>
  );
};

export default ProfileControls;
