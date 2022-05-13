import { NavLink, Outlet } from 'react-router-dom';

import Card from '../ui/card/Card';
import pageStyles from './Pages.module.css';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const classHandler = ({ isActive }: { isActive: boolean }): string =>
    isActive ? styles.active : '';
  return (
    <main>
      <Card className={pageStyles.page}>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink to="orders" className={classHandler}>
                Orders History
              </NavLink>
            </li>
            <li>
              <NavLink to="addresses" className={classHandler}>
                Known Addresses
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </Card>
    </main>
  );
};

export default ProfilePage;
