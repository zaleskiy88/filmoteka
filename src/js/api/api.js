import axios from 'axios';
import { BASE_URL } from './../../constants/constants';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchParameters = {
  query: '',
  page: 1,
  language: localStorage.lang,
};
