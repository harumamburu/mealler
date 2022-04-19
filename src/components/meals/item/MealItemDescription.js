import PropTypes from 'prop-types';

import styles from './MealItemDescription.module.css';

const MealItemDescription = (props) => {
  return (
    <div className={`${styles.description} ${props.className}`}>
      <header>{props.name}</header>
      <p className={styles.content}>{props.description}</p>
      <p className={styles.price}>{`$${props.price}`}</p>
    </div>
  );
};

MealItemDescription.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default MealItemDescription;
