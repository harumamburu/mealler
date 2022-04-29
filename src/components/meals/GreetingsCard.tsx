import Card from '../ui/card/Card';
import styles from './GreetingsCard.module.css';

const GreetingsCard = () => {
  return (
    <Card className={styles.greetings}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals and enjoy a delicious
        lunch or dinner at home
      </p>
      <p>
        All out measl are cooked with high-quality ingredients, just-in-time and of course by
        experienced chefs!
      </p>
    </Card>
  );
};

export default GreetingsCard;
