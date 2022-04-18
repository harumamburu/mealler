import Button from '../button/Button';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles['header']}>
      <h1>Mealler</h1>
      <Button>Cart</Button>
    </header>
  );
};

export default Header;
