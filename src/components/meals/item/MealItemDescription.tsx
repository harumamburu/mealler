import Meal from '../../../model/Meal';
import styles from './MealItemDescription.module.css';

const MealItemDescription: React.FC<{
  meal: Meal;
  showDescription?: boolean;
  className?: string;
}> = (props) => {
  return (
    <div className={`${styles.description} ${props.className}`}>
      <h4>{props.meal.name}</h4>
      {props.showDescription ? <p className={styles.content}>{props.meal.description}</p> : ''}
      <p className={styles.price}>{`$${props.meal.price}`}</p>
    </div>
  );
};

export default MealItemDescription;
