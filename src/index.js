import refs from "./refs";
import ApiService from "./apiService";
import templateCard from "./template/templateCard.hbs";
import "./styles.css";
import "../images/icon-close.svg";
import "@pnotify/core/dist/BrightTheme.css";

const apiService = new ApiService();
const { error } = require("@pnotify/core");

refs.searchForm.addEventListener("submit", onSearch);
refs.loadBtn.addEventListener("click", onLoadMore);
refs.closeModalBtn.addEventListener("click", onCloseModal);

function onSearch(e) {
  e.preventDefault();
  clearContainer();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService
    .fetchArticles()
    .then((hits) => {
      cardMarkup(hits);
      refs.loadBtn.classList.remove("disabled");
      refs.cardContainer.addEventListener("click", onOpenModal);
    })
    .catch((error) => console.log(error));
}
function onOpenModal(e) {
  const condition = e.target.nodeName === "IMG";

  if (condition) {
    window.addEventListener("keydown", onEscKeyPress);
    refs.openModalBtn.classList.add("is-open");
    refs.modalImage.src = e.target.dataset.src;
  }
}
function onLoadMore() {
  apiService.fetchArticles().then((hits) => {
    cardMarkup(hits);
    setTimeout(
      () =>
        refs.cardContainer.scrollIntoView({
          behavior: "smooth",
          block: "end",
        }),
      1000
    );
  });
}

function cardMarkup({ hits, totalHits }) {
  // refs.cardContainer.insertAdjacentHTML("beforeend", templateCard(hits));
  if (totalHits == 0) {
    console.log("hits");
    throw error({
      text: "No images has been found. Please enter a more specific query!",
    });
  } else {
    refs.cardContainer.insertAdjacentHTML("beforeend", templateCard(hits));
  }
}

function clearContainer() {
  refs.cardContainer.innerHTML = "";
  refs.loadBtn.classList.add("disabled");
}

function onCloseModal(evt) {
  window.removeEventListener("keydown", onEscKeyPress);

  refs.openModalBtn.classList.remove("is-open");
  refs.modalImage.src = "";
}

// =========================Закрытие по бэкдропу=====================

const backdrop = document.querySelector(".lightbox");
backdrop.addEventListener("click", onBackdropClick);
function onBackdropClick(event) {
  if (event.target.classList.contains("lightbox__overlay")) {
    onCloseModal(backdrop);
  }
}

// // =======================================Закрытие по Escape===================================

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
