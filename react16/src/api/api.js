import { API_URLS } from '../constants/apiUrls';

export const fetchPets = async (signal) => {
  const res = await fetch(API_URLS.pets, { signal });
  const data = await res.json();

  return data;
};

export const addPets = async (data = []) => {
  const response = await fetch(API_URLS.pets, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deleteAllPets = async () => {
  const response = await fetch(API_URLS.pets, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  });
  return response.json();
};
