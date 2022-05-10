import CartButton from './CartButton';
import background from '../../assets/meals.jpeg';
import styles from './Header.module.css';
import ProfileControls from './ProfileControls';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Mealler</h1>
        <div className={styles.controls}>
          <CartButton />
          <ProfileControls />
        </div>
      </header>
      <div className={styles['background-image']}>
        <img src={background} alt="table full of food" />
      </div>
    </>
  );
};

export default Header;
