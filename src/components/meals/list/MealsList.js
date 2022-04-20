import { useContext } from 'react';

import Card from '../../ui/card/Card';
import MealItem from '../item/MealItem';
import MenuContext from '../../store/menu-context';
import OrderContext from '../../store/order-context';
import styles from './MealsList.module.css';

const MealsList = () => {
  const menuCtx = useContext(MenuContext);
  const orderCtx = useContext(OrderContext);

  return (
    <Card className={styles.meals}>
      <ul>
        {menuCtx.menu.map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            onOrder={(amount) => orderCtx.addOrderPosition(meal, amount)}
          />
        ))}
      </ul>
    </Card>
  );
};

export default MealsList;
