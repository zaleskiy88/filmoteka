const paginationList = document.querySelector(".pagination-list");

const refs = {
    paginationList: document.querySelector(".pagination-list"),
    prevBtn: document.querySelector(".btn-prev"),
    nextBtn: document.querySelector(".btn-next"),
}

const params = {
    page: 1,
}

function generateButtons(page, lastPage) {
    let buttons = [];
    for (let i = page; i <= lastPage; i += 1) {
        const button = `<button>${i}</button>`;
        buttons.push(button);
    }
    return buttons;
}

refs.paginationList.innerHTML =  generateButtons(1, 5).join("");

refs.paginationList.addEventListener('click', onPaginationBtnClick);

function onPaginationBtnClick(event) {
    params.page = Number(event.target.textContent);
    if (params.page - 2 <= 0) {
        refs.paginationList.innerHTML =  generateButtons(1, 5).join("");
        return;
    }
    refs.paginationList.innerHTML =  generateButtons(params.page - 2, params.page + 2).join("");
}

refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onPrevBtnClick() {
    console.log(params.page);
    if (params.page - 4 < 0) {
        return;
    }
    refs.paginationList.innerHTML =  generateButtons(params.page - 4, params.page).join("");
    params.page -= 2;
}

function onNextBtnClick() {
    refs.paginationList.innerHTML =  generateButtons(params.page, params.page + 4).join("");
    params.page += 2;
}