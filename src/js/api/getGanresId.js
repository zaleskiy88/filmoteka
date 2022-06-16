import constants from '../../constants/constants';
import { api } from './api';

const getGenresIdsParams = {
  language: localStorage.lang || 'en',
};
// Get genres array
export default async function getGenresIds() {
  const response = await api.get(constants.MOVIE_GENRES_URL, {
    params: getGenresIdsParams,
  });

  return response.data.genres;
}
