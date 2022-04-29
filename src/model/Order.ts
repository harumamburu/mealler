import OrderedMeal from './OrderedMeal';

type Order = {
  positions: OrderedMeal[];
  totalAmount: number;
  totalPrice: number;
};

export default Order;
