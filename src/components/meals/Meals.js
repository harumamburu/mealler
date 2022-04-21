import { useContext, useEffect, useState } from 'react';

import Card from '../ui/card/Card';
import GreetingsCard from './GreetingsCard';
import MealItem from './item/MealItem';
import OrderContext from '../store/order-context';
import styles from './Meals.module.css';

const MENU = [
  { id: 'me1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 },
  { id: 'me2', name: 'Schnitzel', description: 'German special', price: 16.5 },
  { id: 'me3', name: 'Barbeque Burger', description: 'American, raw, meaty', price: 12.99 },
  { id: 'me4', name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99 },
];

const MealsList = () => {
  const [menu, setMenu] = useState([]);
  const orderCtx = useContext(OrderContext);

  useEffect(() => setMenu(MENU), []);

  return (
    <>
      <GreetingsCard />
      <Card className={styles.meals}>
        <ul>
          {menu.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onOrder={(amount) => orderCtx.addOrderPosition({ ...meal, amount: +amount })}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default MealsList;
