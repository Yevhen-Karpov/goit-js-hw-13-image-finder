const BASE_URL = "https://pixabay.com/api";
const API_KEY = "23964778-a3e050be7e1391d793e3046e4";
export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchArticles(searchQuery) {
    const url = `${BASE_URL}/?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&pretty = true`;

    return fetch(url)
      .then((response) => response.json())
      .then((hits) => {
        this.page += 1;
        return hits;
      })
      .catch();
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
