import Greetings from './components/Greetings';
import MealsList from './components/meals/list/MealsList';
import Header from './components/ui/header/Header';
import Modal from './components/ui/modal/Modal';

function App() {
  return (
    <>
      <Header />
      <Greetings />
      <MealsList></MealsList>
      <Modal>
        <div>Hi There!</div>
      </Modal>
    </>
  );
}

export default App;
