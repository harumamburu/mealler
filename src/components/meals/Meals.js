import GreetingsCard from './list/GreetingsCard';
import MealsList from './list/MealsList';
import { MenuContextProvider } from '../store/menu-context';

const Meals = () => {
  return (
    <>
      <GreetingsCard />
      <MenuContextProvider>
        <MealsList />
      </MenuContextProvider>
    </>
  );
};

export default Meals;
