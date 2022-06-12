import langArr from './all-leng.js';

const langSelector = document.querySelector('#lang');
const html = document.querySelector('html');
const AllLng = ['en', 'ru', 'uk'];

const langStart = localStorage.getItem('lang') || '';

if (langStart !== '') {
  langSelector.value = langStart;
  location.href = window.location.pathname + '#' + langStart;
}

changeLang();

langSelector.addEventListener('change', changeUrlLng);

function changeUrlLng() {
  let lang = langSelector.value;
  location.href = window.location.pathname + '#' + lang;
  changeLang();
}

function changeLang() {
  let hash = window.location.hash;
  hash = hash.slice(1);
  if (!AllLng.includes(hash)) {
    location.href = window.location.pathname + '#en';
    localStorage.setItem('lang', 'en');
    html.setAttribute('lang', 'en');
  }
  html.setAttribute('lang', hash);
  localStorage.setItem('lang', hash);
  langSelector.value = hash;
  for (let key in langArr) {
    let elem = document.querySelector(`[data-lng="${key}"]`);
    if (elem) {
      if (key) {
        elem.innerHTML = langArr[key][hash];
      }
    }
  }
}

langSelector.addEventListener('change', e => window.location.reload());

export { changeLang };
