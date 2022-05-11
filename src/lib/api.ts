import FireBaseAuthResponse from '../model/FireBaseAuthResponse';
import Meal from '../model/Meal';

const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;
const FB_API_KEY = process.env.REACT_APP_FB_API_KEY;
const FB_API_DOMAIN = process.env.REACT_APP_FB_API_DOMAIN;

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
  return firebaseAccountsRequest('signInWithPassword', email, password);
};

export const signUp = async (email: string, password: string) => {
  return firebaseAccountsRequest('signUp', email, password);
};

const firebaseAccountsRequest = async (action: string, email: string, password: string) => {
  const response = await fetch(`${FB_API_DOMAIN}/accounts:${action}?key=${FB_API_KEY}`, {
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
