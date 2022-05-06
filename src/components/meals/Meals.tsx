import { useContext, useEffect } from 'react';

import { fetchMeals } from '../../lib/api';
import Card from '../ui/card/Card';
import GreetingsCard from './GreetingsCard';
import MealItem from './item/MealItem';
import OrderContext from '../../store/order-context';
import Spinner from '../ui/spinner/Spinner';
import useHttp, { Status } from '../../hooks/use-http';
import styles from './Meals.module.css';

const MealsList = () => {
  const orderCtx = useContext(OrderContext);
  const { data: menu, error, status, httpCallback } = useHttp(fetchMeals, true);

  useEffect(() => {
    httpCallback();
  }, [httpCallback]);

  return (
    <>
      <GreetingsCard />
      <Card className={styles.meals}>
        {status === Status.PENDING && <Spinner />}
        {error !== '' && (
          <>
            <p>
              Something went wrong and we couldn&apos;t load the menu :/ Please, try again later.
            </p>
            <p>{error}</p>
          </>
        )}
        {menu && (
          <ul>
            {menu?.map((meal) => (
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
