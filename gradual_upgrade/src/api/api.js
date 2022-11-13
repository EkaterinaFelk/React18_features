import { API_URLS, API_HEADERS } from '../constants/apiUrls';

export const fetchPets = async (signal) => {
  const res = await fetch(API_URLS.pets, { signal });
  const data = await res.json();

  return data.data;
};

export const addPets = async (data = []) => {
  const response = await fetch(API_URLS.pets, {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({data})
  });
  return response.json();
};

export const deleteAllPets = async () => {
  const response = await fetch(API_URLS.pets, {
    method: 'DELETE',
    headers: API_HEADERS,
  });
  return response.json();
};
