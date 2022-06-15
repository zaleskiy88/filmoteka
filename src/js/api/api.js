import axios from 'axios';
import { BASE_URL, API_KEY } from './../../constants/constants';

export const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});
