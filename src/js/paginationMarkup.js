const refs = {
    paginationList: document.querySelector('.pagination-list'),
    input: document.querySelector(".header__input"),
    gallery:document.querySelector('.gallery'),
    preloaderContainer:document.querySelector('.preloader'),
    footer:document.querySelector('.footer'),
  };

function renderSpan(value) {
    return `<span data-value='${value}'>${value}</span>`;
  }

export function renderingPaginationMarkup(currentPage) {
  let maxPage = refs.input?.value 
    ? Number(localStorage.getItem("onSearchTotalPages")) 
    : Number(localStorage.getItem("trendingTotalPages"));
    const pagesArray = Array.apply(null, {
  length: maxPage ?? 0,
})
  .map(Number.call, Number)
  .map((item) => item + 1)
  console.log("maxPage markup", maxPage);
  console.log(pagesArray);

    let result = pagesArray.length <= 3
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
          return "<span data-value='dots'>...</span>";
        }
        return "";
           
        }).join("");
        if (currentPage > 1) {
          result = `<span class='pagination__prev' data-span='prev'>&#129044</span>` + result;
        }
        if (currentPage >= 1 && currentPage !== maxPage) {
          result = result + `<span class='pagination__next' data-span='next'>	
          &#10141</span>`;
        }
        if (refs.paginationList) {
          refs.paginationList.innerHTML = result;
          console.log(result);
    refs.paginationList.querySelectorAll("span").forEach(item => {
      if (item.innerHTML == currentPage) {
        item.classList.toggle("active");
      }
    });
        }
    
}