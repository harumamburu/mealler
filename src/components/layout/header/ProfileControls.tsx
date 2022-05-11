import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import { faDoorOpen, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalContext from '../../../store/modal-context';
import styles from './ProfileControls.module.css';

const ProfileControls = () => {
  const authCtx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);
  const [isAnimated, setIsAnimated] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    authCtx.logout();
    if (location.pathname !== '/' && !location.pathname.includes('menu')) {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      {!authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated === 'signin' ? styles.press : ''}`}
          size="2x"
          icon={faDoorOpen}
          onPointerDown={() => setIsAnimated('signin')}
          onPointerUp={() => setIsAnimated('')}
          onClick={() => modalCtx.setModal('signin', true)}
        />
      )}
      {authCtx.userId && (
        <Link to="/profile" className={styles.icon}>
          <FontAwesomeIcon
            className={isAnimated === 'profile' ? styles.press : ''}
            size="2x"
            icon={faUser}
            onPointerDown={() => setIsAnimated('profile')}
            onPointerUp={() => setIsAnimated('')}
          />
        </Link>
      )}
      {authCtx.userId && (
        <FontAwesomeIcon
          className={`${styles.icon} ${isAnimated === 'signout' ? styles.press : ''}`}
          size="2x"
          icon={faDoorClosed}
          onPointerDown={() => setIsAnimated('signout')}
          onPointerUp={() => setIsAnimated('')}
          onClick={logoutHandler}
        />
      )}
    </>
  );
};

export default ProfileControls;
