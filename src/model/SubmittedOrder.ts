import Address from './Address';
import OrderedMeal from './OrderedMeal';

type SubmittedOrder = {
  date: string;
  positions: OrderedMeal[];
  address: Address;
};

export default SubmittedOrder;
