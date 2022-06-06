import axios from 'axios';

const axiosPaginations = axios.create();

const refs = {
    pagesList : document.querySelector('#paginations'),
    incrementBtn : document.querySelector('#increment'),
    decrementBtn: document.querySelector('#decrement'),
    previosPagesBtn: document.querySelector('#previos'),
    nextPagesBtn: document.querySelector('#next'),
    
}

const params = {
    page: 1,
}

async function getPage () { 
    try {
        return await axiosPaginations.get('https://api.themoviedb.org/3/trending/all/day?api_key=842344de8347536aefc6f17e8e76d4bd', { params });
    }
    catch (error) {
        if (error.response) {
            console.log(error)
        }
     }
}

async function getTotalPages() { 
    const { data } = await getPage();
    return data.total_pages;
}

function createPageList(pagesPerPage, startPage, inc) { 

    for (let i = startPage+inc; i <= pagesPerPage+inc; i++) {
        let btn = document.createElement('button');
        btn.innerHTML = i;
        refs.pagesList.appendChild(btn);
    }

}

createPageList(6, 1, 0);

function onPageNumberBtnrClick(e) { 
    if (e.target.nodeName !== 'BUTTON') { 
        return;
    }
    params.page = Number(e.target.textContent);
    getPage();
}

refs.pagesList.addEventListener('click', onPageNumberBtnrClick)


/////////////////////////////////////////////////////////////////////////////////
function onIncrementBtnClick(e) { 
    e.preventDefault();
    params.page += 1;
    getPage();
    // decrementBtn.removeAttribute('disabled');
}

function onDecrementBtnClick(e) { 
    e.preventDefault();
    if (params.page > 1) { 
        params.page -= 1;
        getPage();
    }
    return
}

refs.incrementBtn.addEventListener('click', onIncrementBtnClick);
refs.decrementBtn.addEventListener('click', onDecrementBtnClick);
///////////////////////////////////////////////////////////////////////////////////

function onNextBtnClick() { 
    refs.pagesList.innerHTML = '';
    createPageList(6, 1, 3);
    getPage();
}
refs.nextPagesBtn.addEventListener('click', onNextBtnClick);


function onPreviostBtnClick() { 
    refs.pagesList.innerHTML = '';
    createPageList(6, 1, 0);
    getPage();
}
refs.previosPagesBtn.addEventListener('click', onPreviostBtnClick);















// function paginate(array, page_size, page_number) {

//   return array.slice((page_number - 1) * page_size, page_number * page_size);
// }

// async function transformTotalPageAmount() { 
//     const totalPageAmount = await getTotalPages();
//     const array = [];
//     for (let i = 1; i <= totalPageAmount; i++) { 
//         array.push(i)
//     }
//     return array;
// }