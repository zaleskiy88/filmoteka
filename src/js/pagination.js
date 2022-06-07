import axios from 'axios';

const axiosPagination = axios.create();

const refs = {
    pageList: document.querySelector('.pagination__list'),
}

let totalPages = 20;

const params = {
    page: 1,
}

async function getPage () { 
    try {
        return await axiosPagination.get('https://api.themoviedb.org/3/trending/all/day?api_key=842344de8347536aefc6f17e8e76d4bd', { params });
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


window.createPagesItems = function (totalPages, page) { 
    let itemPage = '';
    let activPage;
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 1) { 
        
        itemPage += `<li class="btn prev" onclick="createPagesItems(totalPages, ${page - 1})"><span>←</span></li>`;

    }
    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) { 
        if (page == pageLength) {
            activPage = "active";
        }
        else { 
            activPage = "";
        }
       itemPage += `<li class="numb ${activPage}"><span>${pageLength}</span></li>`
    }

    if (page < totalPages) { 
        itemPage += `<li class="btn" onclick="createPagesItems(totalPages, ${page+1})"><span>→</span></li>`
    }
    refs.pageList.innerHTML = itemPage;
}

 createPagesItems(totalPages, 5)

