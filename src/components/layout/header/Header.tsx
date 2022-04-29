import CartButton from './CartButton';
import styles from './Header.module.css';
import background from '../../assets/meals.jpeg';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Mealler</h1>
        <CartButton />
      </header>
      <div className={styles['background-image']}>
        <img src={background} alt="table full of food" />
      </div>
    </>
  );
};

export default Header;
