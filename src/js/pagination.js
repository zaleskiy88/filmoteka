const refs = {
    paginationList: document.querySelector(".pagination-list"),
}

const maxPage = 20;

const pagesArray = Array.apply(null, {
  length: maxPage ?? 0,
})
  .map(Number.call, Number)
  .map((item) => item + 1);

  function renderSpan(value) {
    return `<span>${value}</span>`; 
  }

refs.paginationList.addEventListener('click', onPaginationBtnClick);

function onPaginationBtnClick(event) {
    renderingPaginationMarkup(Number(event.target.textContent));
}

function renderingPaginationMarkup(currentPage) {
    const result = pagesArray.length <= 3
    ? pagesArray.map((item) => renderSpan(item))
    : pagesArray.map((item) => {
        if (
          item === maxPage ||
          item === 1 ||
          item === currentPage - 1 ||
          item === currentPage + 1 ||
          item === currentPage - 2 ||
          item === currentPage + 2 ||
          item === currentPage
        )
        {
          return renderSpan(item);
        }
        if(item === currentPage - 3 || item === currentPage + 3) {
          return "<span>...</span>";
        }
        return "";
           
        });

    refs.paginationList.innerHTML = result.join("");
}

renderingPaginationMarkup(1);

  