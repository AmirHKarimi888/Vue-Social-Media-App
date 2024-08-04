import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export const VITE_PB_URL_USERS = import.meta.env.VITE_PB_URL_USERS;