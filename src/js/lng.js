import  langArr from './all-leng.js';

const select = document.querySelector('#lang');
const html = document.querySelector('html');
const AllLng = ['en', 'ru', 'uk'];


const lengStart = localStorage.getItem('lang') || '';

if(lengStart !== ''){
    select.value = lengStart;
    location.href = window.location.pathname + "#" + lengStart;
    }

changeLng();

select.addEventListener('change', changeUrlLng);

function changeUrlLng() {
    let lang =select.value;
    location.href = window.location.pathname + "#" + lang;
    changeLng()
}

 function changeLng(){
    let hash = window.location.hash;
    hash = hash.slice(1);
    if(!AllLng.includes(hash)){
        location.href = window.location.pathname + "en";
        localStorage.setItem('lang', "en");
        html.setAttribute('lang', "en");
    }
    html.setAttribute('lang', hash);
    localStorage.setItem('lang', hash);
    select.value = hash;
        for(let key in langArr){
            let elem = document.querySelector(`[data-lng="${key}"]`);
                if(elem){
                    if(key){
                        elem.innerHTML = langArr[key][hash];
                    }
                } 
                
            }
};

export {changeLng};


