import { useContext, useEffect, useState } from 'react';

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

  const signInHandler = () => {
    setIsAnimated(true);
    modalCtx.setModal('signin', true);
  };
  const signoutHandler = () => {
    setIsAnimated(true);
    authCtx.logout();
  };

  return (
    <>
      {!authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated ? styles.press : ''}`}
          size="2x"
          icon={faDoorOpen}
          onClick={signInHandler}
        />
      )}
      {authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated ? styles.press : ''}`}
          size="2x"
          icon={faDoorClosed}
          onClick={signoutHandler}
        />
      )}
      {authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated ? styles.press : ''}`}
          size="2x"
          icon={faUser}
        />
      )}
    </>
  );
};

export default ProfileControls;
