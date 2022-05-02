import Meal from '../model/Meal';

const FIREBASE_DOMAIN =
  'https://react-courses-e06a8-default-rtdb.europe-west1.firebasedatabase.app/mealler';

export const fetchMeals = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/meals.json`);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as { [key: string]: Meal };
  if (!data) {
    throw new Error('Data is null');
  }

  return Object.entries(data).map(([key, value]) => ({ ...value, id: key }));
};
