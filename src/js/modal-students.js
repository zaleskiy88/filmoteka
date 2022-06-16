const refs = {
    openModalBtn: document.querySelector(".modal-footer__open"),
    backdrop: document.querySelector(".backdrop"),
    closeModalBtn: document.querySelector(".close-modal")
}

function onOpenModalClick() {
    console.log("onOpenModal");
    document.body.classList.add("show-modal");
    console.log("modal click");
}

function onBackdropClick() {
    console.log("on backdrop click");
}

function onCLoseModal() {
    console.log("onCloseModal");
    document.body.classList.remove("show-modal");
}

refs.openModalBtn.addEventListener("click", onOpenModalClick);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.closeModalBtn.addEventListener('click', onCLoseModal);

