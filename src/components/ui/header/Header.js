import CartButton from './CartButton';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.header}>
      <h1>Mealler</h1>
      <CartButton />
    </nav>
  );
};

export default Header;
