import FireBaseAuthResponse from '../model/FireBaseAuthResponse';
import Meal from '../model/Meal';

const FIREBASE_DOMAIN =
  'https://react-courses-e06a8-default-rtdb.europe-west1.firebasedatabase.app/mealler';
const FB_API_KEY = '[API_KEY]';
const FB_API_DOMAIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?';

export const fetchMeals = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/meals.json`);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as { [key: string]: Meal };
  if (!data) {
    throw new Error('Data is null');
  }

  return Object.entries(data).map(([key, value]) => ({ ...value, id: key } as Meal));
};

export const logIn = async (email: string, password: string) => {
  const response = await fetch(`${FB_API_DOMAIN}key=${FB_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return { ...data } as FireBaseAuthResponse;
};
