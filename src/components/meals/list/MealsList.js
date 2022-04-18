import { useState } from 'react';

import Card from '../../ui/card/Card';
import MealItem from '../item/MealItem';
import styles from './MealsList.module.css';

const MEALS = [
  { name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 },
  { name: 'Schnitzel', description: 'German special', price: 16.5 },
  { name: 'Barbeque Burger', description: 'American, raw, meaty', price: 12.99 },
  { name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99 },
];

const MealsList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [meals, setMeals] = useState(MEALS);

  return (
    <Card className={styles.meals}>
      <ul>
        {meals.map((meal, index) => (
          <MealItem
            key={index}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default MealsList;
