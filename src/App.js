import Greetings from './components/Greetings';
import MealsList from './components/meals/list/MealsList';
import Header from './components/ui/header/Header';

function App() {
  return (
    <>
      <Header />
      <Greetings />
      <MealsList></MealsList>
    </>
  );
}

export default App;
