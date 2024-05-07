import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (email, password) => {
  return axios.post(`${API_URL}/users/register`, { email, password });
};

export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export const search = (query) => {
  return axios.get(`${API_URL}/search`, { params: { query } });
};

