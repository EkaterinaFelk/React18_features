import { API_URLS } from '../constants/apiUrls';

export const fetchPets = async (signal) => {
  const res = await fetch(API_URLS.pets, { signal });
  const data = await res.json();

  return data;
};
