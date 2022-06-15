import axios from 'axios';
import constants from './../../constants/constants';

export const api = axios.create({
  baseURL: constants.BASE_URL,
});

export const searchParameters = {
  query: '',
  page: 1,
  language: localStorage.lang,
};
