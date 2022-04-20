import { useContext } from 'react';

import Card from '../../ui/card/Card';
import MealItem from '../item/MealItem';
import WaiterContext from '../../store/waiter-context';
import styles from './MealsList.module.css';

const MealsList = () => {
  const waiterCtx = useContext(WaiterContext);

  return (
    <Card className={styles.meals}>
      <ul>
        {waiterCtx.menu.map((meal) => (
          <MealItem
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            onOrder={(amount) => waiterCtx.addOrderPosition(meal.id, amount)}
          />
        ))}
      </ul>
    </Card>
  );
};

export default MealsList;
