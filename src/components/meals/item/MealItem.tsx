import Meal from '../../../model/Meal';
import MealItemControls from './MealItemControls';
import MealItemDescription from './MealItemDescription';
import styles from './MealItem.module.css';

const MealItem: React.FC<{meal: Meal, onOrder: (amount: number) => void}> = (props) => {
  return (
    <li className={styles.meal}>
      <MealItemDescription meal={props.meal} showDescription />
      <MealItemControls name={props.meal.name} onOrder={props.onOrder} />
    </li>
  );
};

export default MealItem;
