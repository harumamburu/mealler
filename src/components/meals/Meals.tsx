import { useCallback, useContext, useEffect, useState } from 'react';

import { fetchMeals } from '../../lib/api';
import Card from '../ui/card/Card';
import GreetingsCard from './GreetingsCard';
import Meal from '../../model/Meal';
import MealItem from './item/MealItem';
import OrderContext from '../store/order-context';
import Spinner from '../ui/spinner/Spinner';
import styles from './Meals.module.css';

const MealsList = () => {
  const [menu, setMenu] = useState([] as Meal[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const orderCtx = useContext(OrderContext);

  const fetchMealsHandler = useCallback(async () => {
    let meals = [] as Meal[];
    setIsLoading(true);
    try {
      meals = await fetchMeals();
    } catch (err) {
      setError((err as Error).message);
    }
    setMenu(meals);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  return (
    <>
      <GreetingsCard />
      <Card className={styles.meals}>
        {isLoading && <Spinner />}
        {error ? (
          <>
            <p>
              Something went wrong and we couldn&apos;t load the menu :/ Please, try again later.
            </p>
            <p>{error}</p>
          </>
        ) : (
          <ul>
            {menu.map((meal) => (
              <MealItem
                key={meal.id}
                meal={meal}
                onOrder={(amount) => orderCtx.addOrderPosition({ ...meal, amount: +amount })}
              />
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};

export default MealsList;
