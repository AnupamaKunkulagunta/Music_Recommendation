import axios from 'axios';

const API_URL = 'http://localhost:4000/api';


export const loginWithGoogle = (idToken) => {
  return axios.post(`${API_URL}/login`, { idToken });
};

export const search = (query) => {
  return axios.get(`${API_URL}/search`, { params: { query } });
};

export const getUserDetails = (token) => {
  return axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};