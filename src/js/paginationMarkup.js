const refs = {
    paginationList: document.querySelector('.pagination-list'),
    input: document.querySelector(".header__input"),
    gallery:document.querySelector('.gallery'),
    preloaderContainer:document.querySelector('.preloader'),
    footer:document.querySelector('.footer'),
  };

let maxPage = refs.input?.value 
? Number(localStorage.getItem("onSearchTotalPages")) 
: Number(localStorage.getItem("trendingTotalPages"));
async function getTotalPagesArray() { 
  const array = [];
  for (let i = 1; i <= maxPage; i++) { 
      array.push(i)
  }
  return array;
}

console.log(maxPage);

function renderSpan(value) {
    return `<span data-value='${value}'>${value}</span>`;
  }

export async function renderingPaginationMarkup(currentPage, maxPage) {
    const pagesArray = await getTotalPagesArray();
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
    refs.paginationList.querySelectorAll("span").forEach(item => {
      if (item.innerHTML == currentPage) {
        item.classList.toggle("active");
      }
    });
        }
    
}