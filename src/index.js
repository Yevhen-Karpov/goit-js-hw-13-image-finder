// const element = document.getElementById(".my-element-selector");
// element.scrollIntoView({
//   behavior: "smooth",
//   block: "end",
// });
const refs = {
  cardContainer: document.querySelector(".gallery"),
  searchForm: document.getElementById("search-form"),
  formBtn: document.querySelector(".form-btn"),
  loadBtn: document.querySelector(".load-btn"),
};
import ApiService from "./apiService";
import templateCard from "./template/templateCard.hbs";
import "./styles.css";

refs.searchForm.addEventListener("submit", onSearch);
refs.loadBtn.addEventListener("click", onLoadMore);
const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchArticles().then(cardMarkup);
}
function onLoadMore() {
  apiService.fetchArticles().then(cardMarkup);
}
function cardMarkup(hits) {
  refs.cardContainer.insertAdjacentHTML("beforeend", templateCard(hits));
}
