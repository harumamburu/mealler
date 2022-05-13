import Address from '../model/Address';
import Meal from '../model/Meal';
import SubmittedOrder from '../model/SubmittedOrder';

const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;
const FB_API_KEY = process.env.REACT_APP_FB_API_KEY;
const FB_API_DOMAIN = process.env.REACT_APP_FB_API_DOMAIN;

type FirebasePostResponse = {
  name: string;
};

export type FireBaseAuthResponse = {
  localId: string;
  idToken: string;
  expiresIn: string;
  email: string;
  refreshToken: string;
};

export const fetchMeals = async () => {
  return firebaseDbGet<Meal>('meals');
};

export const fetchAddresses = async (userId: string) => {
  return firebaseDbGet<Address>(`addresses/${userId}`);
};

export const saveAddress = async (userId: string, address: Address) => {
  return { addressId: (await firebaseDbPost(`addresses/${userId}`, address)).name };
};

export const submitOrder = async (userId: string, order: SubmittedOrder) => {
  return { orderId: (await firebaseDbPost(`orders/${userId}`, order)).name };
};

const firebaseDbGet = async <T>(document: string) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/${document}.json`);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as { [key: string]: T };
  if (!data) {
    throw new Error('Data is null');
  }

  return Object.entries(data).map(([key, value]) => ({ ...value, id: key } as T));
};

const firebaseDbPost = async (document: string, entity: {}) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/${document}.json`, {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Could not create: ${response.status}`);
  }

  return data as FirebasePostResponse;
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
