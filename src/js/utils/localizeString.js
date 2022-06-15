import lengArr from '../all-leng';
export default key =>
  lengArr[key] ? lengArr[key][localStorage.getItem('lang') || 'en'] : key;
